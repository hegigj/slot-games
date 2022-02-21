import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import {GameItem} from "../models/game-item.inteface";
import {GamesService} from "../services/games.service";

@Injectable({
  providedIn: 'root'
})
export class GamesResolver implements Resolve<GameItem[]> {
  constructor(private gamesService: GamesService) {}

  resolve(): Observable<GameItem[]> {
    return this.gamesService.fetchGames();
  }
}
