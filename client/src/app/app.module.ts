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
import { SharedConstants } from './constants/shared.constants';

@NgModule({
	declarations: [AppComponent, SyncComponent, TeamLeaderboardComponent],
	providers: [GoogleFitService, DataService, SharedConstants],
	imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, NgbModule],
	bootstrap: [AppComponent]
})
export class AppModule { }
