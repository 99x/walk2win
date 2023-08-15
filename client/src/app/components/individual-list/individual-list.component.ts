import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-individual-list',
	templateUrl: './individual-list.component.html',
	styleUrls: ['./individual-list.component.less']
})
export class IndividualListComponent implements OnInit {
	@Input() players: any;
	@Input() type: string;
	@Input() isTeam: boolean;

	player: any;
	playerName: string;
	isMemberSelected = false;
	constructor(
		private dataService: DataService,
		private spinner: NgxSpinnerService) { }

	ngOnInit() {
	}

	getIndividual(player: any) {
		const topTeamsEndpoint = `/api/v1/leaderboard/topplayers/${player.id}`;
		this.dataService.getIndividualPlayerScore(topTeamsEndpoint)
			.subscribe(
				(playerResp: any) => {
					this.player = playerResp;
					this.playerName = player.name;
					this.isMemberSelected = true;
				},
				err => {
					console.log(err);
				}
			);
	}

}
