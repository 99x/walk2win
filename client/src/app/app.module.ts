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

@NgModule({
	declarations: [AppComponent, SyncComponent, TeamLeaderboardComponent],
	providers: [GoogleFitService],
	imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule, NgbModule],
	bootstrap: [AppComponent]
})
export class AppModule { }
