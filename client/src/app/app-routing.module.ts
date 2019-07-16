import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamLeaderboardComponent } from './components/team-leaderboard/team-leaderboard.component';
import { SyncComponent } from './components/sync/sync.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

const routes: Routes = [
	{
		path: '',
		component: TeamLeaderboardComponent
	},
	{
		path: 'sync',
		component: SyncComponent
	},
	{
		path: 'terms',
		component: TermsOfServiceComponent
	},
	{
		path: 'privacy',
		component: PrivacyComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
