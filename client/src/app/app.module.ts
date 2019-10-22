import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TeamLeaderboardComponent } from './components/team-leaderboard/team-leaderboard.component';
import { SyncComponent } from './components/sync/sync.component';

import { GoogleFitService } from './services/google-fit.service';
import { DataService } from './services/data.service';
import { CookieService } from './services/cookie.service';

import { PrivacyComponent } from './components/privacy/privacy.component';
import { PointsTableComponent } from './components/points-table/points-table.component';
import { RulesAndRegulationsComponent } from './components/rules-and-regulations/rules-and-regulations.component';
import { ManualSyncComponent } from './components/manual-sync/manual-sync.component';
import { TeamMembersComponent } from './components/team-members/team-members.component';
import { TeamsListComponent } from './components/teams-list/teams-list.component';

import { SharedConstants } from './constants/shared.constants';
import { IndividualComponent } from './components/individual/individual.component';
import { IndividualListComponent } from './components/individual-list/individual-list.component';
@NgModule({
	declarations: [
		AppComponent,
		SyncComponent,
		TeamLeaderboardComponent,
		PrivacyComponent,
		PointsTableComponent,
		RulesAndRegulationsComponent,
		ManualSyncComponent,
		TeamMembersComponent,
		TeamsListComponent,
		IndividualComponent,
		IndividualListComponent],
	providers: [
		GoogleFitService,
		DataService,
		CookieService,
		SharedConstants],
	imports: [
		BrowserModule,
		FormsModule,
		HttpClientModule,
		AppRoutingModule,
		NgxSpinnerModule,
		NgbModule],
	bootstrap: [AppComponent],
	schemas: [
		CUSTOM_ELEMENTS_SCHEMA,
		NO_ERRORS_SCHEMA]
})

export class AppModule { }
