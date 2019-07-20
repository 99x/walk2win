import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
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
			private dataService: DataService
		) { }

	ngOnInit() {

		const getTeamListUrl = `/api/v1/leaderboard/topteams/${this.team._id}`;

		this.dataService.getTeamList(getTeamListUrl).subscribe(response => {
			console.log('res', response);
			this.teamMembers = response;
		}, err => {
			console.log(err);
		});
	}

	navigateBack() {
		this.backClicked.emit(true);
	}

}
