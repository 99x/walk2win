import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-team-leaderboard',
	templateUrl: './team-leaderboard.component.html',
	styleUrls: ['./team-leaderboard.component.less']
})
export class TeamLeaderboardComponent implements OnInit {

	private teams: any;
	private malePlayers: any;
	private femalePlayers: any;

	constructor(private http: HttpClient) { }

	ngOnInit() {
		this.loadTeamsLeaderboard();
		this.loadMaleLeaderboard();
		this.loadFemaleLeaderboard();
	}

	private loadTeamsLeaderboard() {
		let topTeamsEndpoint = environment.baseApi + '/api/v1/leaderboard/topteams';
		this.http.get(topTeamsEndpoint).subscribe((teams: any) => {
			this.teams = teams;
		});
	}

	private loadMaleLeaderboard() {
		let topMaleEndpoint = environment.baseApi + '/api/v1/leaderboard/topmaleplayers';
		this.http.get(topMaleEndpoint).subscribe((players: any) => {
			this.malePlayers = players;
		});
	}

	private loadFemaleLeaderboard() {
		let topFemaleEndpoint = environment.baseApi + '/api/v1/leaderboard/topfemaleplayers';
		this.http.get(topFemaleEndpoint).subscribe((players: any) => {
			this.femalePlayers = players;
		});
	}

}