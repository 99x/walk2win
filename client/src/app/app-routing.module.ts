import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TeamLeaderboardComponent } from './components/team-leaderboard/team-leaderboard.component';
import { SyncComponent } from './components/sync/sync.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { RulesAndRegulationsComponent } from './components/rules-and-regulations/rules-and-regulations.component';
import { PointsTableComponent } from './components/points-table/points-table.component';
import { ManualSyncComponent } from './components/manual-sync/manual-sync.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';
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
		path: 'manualsync',
		component: ManualSyncComponent
	},
	{
		path: 'team-list',
		component: TeamsListComponent
	},
	{
		path: 'team-member',
		component: TeamMembersComponent
	},
	{
		path: 'privacy',
		component: PrivacyComponent
	},
	{
		path: 'rules',
		component: RulesAndRegulationsComponent
	},
	{
		path: 'point',
		component: PointsTableComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
