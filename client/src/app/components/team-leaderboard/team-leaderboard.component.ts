import { Component, OnInit } from '@angular/core';
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

	constructor(private dataService: DataService) { }

	ngOnInit() {
		this.loadTeamsLeaderboard();
		this.loadMaleLeaderboard();
		this.loadFemaleLeaderboard();
	}

	private loadTeamsLeaderboard() {
		const topTeamsEndpoint = '/api/v1/leaderboard/topteams';
		this.dataService.getTeamsLeaderboardValues(topTeamsEndpoint)
			.subscribe((teams: any) => {
				this.teams = teams;
			});
	}

	private loadMaleLeaderboard() {
		const topMaleEndpoint = '/api/v1/leaderboard/topmaleplayers';
		this.dataService.getTeamsLeaderboardValues(topMaleEndpoint).subscribe((players: any) => {
			this.malePlayers = players;
		});
	}

	private loadFemaleLeaderboard() {
		const topFemaleEndpoint = '/api/v1/leaderboard/topfemaleplayers';
		this.dataService.getTeamsLeaderboardValues(topFemaleEndpoint).subscribe((players: any) => {
			this.femalePlayers = players;
		});
	}

}