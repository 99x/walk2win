import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-team-leaderboard',
	templateUrl: './team-leaderboard.component.html',
	styleUrls: ['./team-leaderboard.component.less']
})
export class TeamLeaderboardComponent implements OnInit {

	private teams: any;
	private malePlayers: any;
	private femalePlayers: any;

	constructor(private dataService: DataService, private router: Router) { }

	ngOnInit() {
		this.loadMaleLeaderboard();
		this.loadFemaleLeaderboard();
	}



	loadMaleLeaderboard() {
		const topMaleEndpoint = '/api/v1/leaderboard/topmaleplayers';
		this.dataService.getTeamsLeaderboardValues(topMaleEndpoint).subscribe((players: any) => {
			this.malePlayers = players;
		});
	}

	loadFemaleLeaderboard() {
		const topFemaleEndpoint = '/api/v1/leaderboard/topfemaleplayers';
		this.dataService.getTeamsLeaderboardValues(topFemaleEndpoint).subscribe((players: any) => {
			this.femalePlayers = players;
		});
	}

}
