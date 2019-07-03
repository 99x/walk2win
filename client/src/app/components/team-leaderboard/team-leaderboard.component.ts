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

	constructor(private http: HttpClient) { }

	ngOnInit() {
		let topTeamsEndpoint = environment.baseApi + '/api/v1/leaderboard/topteams';
		this.http.get(topTeamsEndpoint).subscribe((teams: any) => {
			this.teams = teams;
		});
	}

}