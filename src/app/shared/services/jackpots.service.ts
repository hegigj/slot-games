import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {GameJackpot} from "../models/game-jackpot.interface";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JackpotsService {
  private readonly url: string;

  private jackpotsSubject: BehaviorSubject<GameJackpot[]>;
  private jackpotEntitySubject: BehaviorSubject<Record<string, number>>;

  get jackpots$(): Observable<GameJackpot[]> {
    return this.jackpotsSubject.asObservable();
  }

  get jackpotEntity$(): Observable<Record<string, number>> {
    return this.jackpotEntitySubject.asObservable();
  }

  constructor(private httpClient: HttpClient) {
    this.url = environment.apiBaseUrl + '/jackpots.php'

    this.jackpotsSubject = new BehaviorSubject<GameJackpot[]>([]);
    this.jackpotEntitySubject = new BehaviorSubject<Record<string, number>>({});
  }

  fetchJackpots(): Observable<GameJackpot[]> {
    return this.httpClient
      .get<GameJackpot[]>(this.url)
      .pipe(
        tap(jackpots => this.jackpotsSubject.next(jackpots)),
        tap(jackpots => this.mapToEntity(jackpots))
      )
  }

  private mapToEntity(jackpots: GameJackpot[]): void {
    this.jackpotEntitySubject.next(
      jackpots.reduce<Record<string, number>>(
        (acc, cur) => ({
          ...acc,
          [cur.game]: cur.amount
        }),
        {}
      )
    );
  }
}
