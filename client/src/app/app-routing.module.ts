import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamLeaderboardComponent } from './components/team-leaderboard/team-leaderboard.component';
import { SyncComponent } from './components/sync/sync.component';

const routes: Routes = [
	{
		path: '',
		component: TeamLeaderboardComponent
	},
	{
		path: 'sync',
		component: SyncComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
