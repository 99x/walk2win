import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TeamLeaderboardComponent } from './components/team-leaderboard/team-leaderboard.component';
import { SyncComponent } from './components/sync/sync.component';

import { GoogleFitService } from './services/google-fit.service';
import { DataService } from './services/data.service';
import { CookieService } from './services/cookie.service';

import { SharedConstants } from './constants/shared.constants';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { PointsTableComponent } from './components/points-table/points-table.component';
import { RulesAndRegulationsComponent } from './components/rules-and-regulations/rules-and-regulations.component';
import { ManualSyncComponent } from './components/manual-sync/manual-sync.component';

@NgModule({
	declarations: [
		AppComponent,
		SyncComponent,
		TeamLeaderboardComponent,
		PrivacyComponent,
		PointsTableComponent,
		RulesAndRegulationsComponent,
		ManualSyncComponent],
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
		NgbModule],
	bootstrap: [AppComponent]
})
export class AppModule { }
