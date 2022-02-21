import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {BehaviorSubject, Observable} from "rxjs";
import {GameItem} from "../models/game-item.inteface";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GamesService {
  private readonly url: string;

  private gamesSubject: BehaviorSubject<GameItem[]>;
  private gameCategoriesSubject: BehaviorSubject<string[]>;

  get games$(): Observable<GameItem[]> {
    return this.gamesSubject.asObservable();
  }

  get gameCategories$(): Observable<string[]> {
    return this.gameCategoriesSubject.asObservable();
  }

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrl + '/games.php';

    this.gamesSubject = new BehaviorSubject<GameItem[]>([]);
    this.gameCategoriesSubject = new BehaviorSubject<string[]>([]);
  }

  fetchGames(): Observable<GameItem[]> {
    return this.httpClient
      .get<GameItem[]>(this.url)
      .pipe(
        tap(games => this.gamesSubject.next(games)),
        tap(games => this.mapGameCategories(games))
      );
  }

  private mapGameCategories(games: GameItem[]): void {
    this.gameCategoriesSubject.next([
      ...new Set(
        games
          .reduce(
            (acc: string[], cur) => [ ...acc, ...cur.categories],
            []
          )
      )
    ]);
  }
}
