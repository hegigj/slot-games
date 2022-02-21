import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GamesComponent} from "./dashboard/games/games.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {GamesResolver} from "./shared/resolvers/games.resolver";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'games',
    pathMatch: 'full'
  },
  {
    path: 'games',
    component: DashboardComponent,
    resolve: {
      games: GamesResolver
    },
    children: [
      {
        path: ':CATEGORY',
        component: GamesComponent
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'games',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
