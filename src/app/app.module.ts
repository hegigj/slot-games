import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GamesComponent } from './dashboard/games/games.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from "@angular/common/http";
import {MaterialModule} from "./shared/modules/material.module";
import {GameItemComponent} from "./shared/components/game-item/game-item.component";
import {TabBarComponent} from "./shared/components/tab-bar/tab-bar.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import {TitleCasePipe} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    GamesComponent,
    GameItemComponent,
    TabBarComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [
    TitleCasePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
