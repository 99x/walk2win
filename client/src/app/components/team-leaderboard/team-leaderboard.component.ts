import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

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
	displaySync = true;

	constructor(
		private dataService: DataService,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
		this.spinner.show();
		this.loadMaleLeaderboard();
		this.loadFemaleLeaderboard();
		this.spinner.hide();

		this.activatedRoute.queryParams.subscribe((params: Params) => {
			console.log(params.sync);
			if (params.mobile) {
				this.displaySync = false;
			}
		});
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
