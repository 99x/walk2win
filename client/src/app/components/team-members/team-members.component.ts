import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-team-members',
	templateUrl: './team-members.component.html',
	styleUrls: ['./team-members.component.less']
})
export class TeamMembersComponent implements OnInit {

	@Input()
	team: any;

	@Output() backClicked: EventEmitter<any> = new EventEmitter();

	teamMembers: any;

	constructor
		(
			private dataService: DataService,
			private spinner: NgxSpinnerService
		) { }

	ngOnInit() {
		this.spinner.show();
		const getTeamListUrl = `/api/v1/leaderboard/topteams/${this.team._id}`;

		this.dataService.getTeamList(getTeamListUrl).subscribe(response => {
			console.log(response);
			this.teamMembers = response;
			this.spinner.hide();
		}, err => {
			console.log(err);
		});
	}

	navigateBack() {
		this.backClicked.emit(true);
	}

}
