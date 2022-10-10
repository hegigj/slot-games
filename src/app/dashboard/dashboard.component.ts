import { Component, OnInit } from '@angular/core';
import {GamesService} from "../core/services/games.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {switchMap} from "rxjs/operators";
import {JackpotsService} from "../core/services/jackpots.service";
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
