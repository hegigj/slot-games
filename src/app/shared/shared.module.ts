import {NgModule} from '@angular/core';
import {CommonModule, TitleCasePipe} from '@angular/common';
import {GameItemComponent} from "./components/game-item/game-item.component";
import {TabBarComponent} from "./components/tab-bar/tab-bar.component";
import {RouterModule} from "@angular/router";
import {CoreModule} from "../core/core.module";



@NgModule({
  declarations: [
    GameItemComponent,
    TabBarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  providers: [
    TitleCasePipe
  ],
  exports: [
    GameItemComponent,
    TabBarComponent
  ]
})
export class SharedModule {}
