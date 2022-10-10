import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {map, switchMap, take, tap} from "rxjs/operators";
import {GameItem} from "../../core/models/game-item.inteface";
import {GameItemModel} from "../../core/models/game-item.model";
import {GamesService} from "../../core/services/games.service";
import {JackpotsService} from "../../core/services/jackpots.service";

@UntilDestroy()
@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  games: GameItemModel[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesService: GamesService,
    private jackpotsService: JackpotsService
  ) {
    this.games = [];
  }

  ngOnInit(): void {
    this.activatedRoute
      .paramMap
      .pipe(
        untilDestroyed(this),
        map(paramMap => paramMap.get('CATEGORY') as string),
        switchMap(category => {
          return this.gamesService
            .games$
            .pipe(
              take(1),
              map(
                allGames => {
                  if (category === 'other') {
                    return allGames.filter(
                      (game: GameItem) => {
                        return (
                          game.categories.indexOf('virtual') !== -1 ||
                          game.categories.indexOf('ball') !== -1 ||
                          game.categories.indexOf('fun') !== -1
                        )
                      }
                    )
                  }

                  return allGames.filter(
                    (game: GameItem) => game.categories.indexOf(category) !== -1
                  )
                }
              )
            )
        }),
        map(
          (games: GameItem[]) =>
            games.map(game => new GameItemModel(game))
        )
      )
      .subscribe(games => this.games = games);

    this.jackpotsService
      .jackpotEntity$
      .pipe(
        untilDestroyed(this),
        tap(
          jackpotEntity =>
            this.games.forEach(game => game.jackpot = jackpotEntity)
        )
      )
      .subscribe()
  }

}
