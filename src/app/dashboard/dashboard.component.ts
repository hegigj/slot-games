import { Component, OnInit } from '@angular/core';
import {GamesService} from "../shared/services/games.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {switchMap, tap} from "rxjs/operators";
import {JackpotsService} from "../shared/services/jackpots.service";
import {interval} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tabs: string[];

  constructor(
    private gamesService: GamesService,
    private jackpotsService: JackpotsService
  ) {
    this.tabs = []
  }

  ngOnInit(): void {
    this.gamesService
      .gameCategories$
      .pipe(untilDestroyed(this))
      .subscribe(gameCategories => this.tabs = gameCategories);

    interval(10000)
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.jackpotsService.fetchJackpots())
      )
      .subscribe();
  }

}
