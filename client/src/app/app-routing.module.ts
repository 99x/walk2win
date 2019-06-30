import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from "./home/home.component";
import { TeamLeaderboardComponent } from './components/team-leaderboard/team-leaderboard.component';

const routes: Routes = [
	{
		path: '',
		component: TeamLeaderboardComponent
	},
	{
		path: 'sync',
		component: HomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
