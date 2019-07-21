import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-manual-sync',
	templateUrl: './manual-sync.component.html',
	styleUrls: ['./manual-sync.component.less']
})
export class ManualSyncComponent implements OnInit {

	constructor(private dataService: DataService, private router: Router) { }

	model: any = {};

	ngOnInit() {
	}



	onSubmit() {
		const manualSyncUrl = '/api/v1/syncmanual';
		const manualSyncModel = {
			stepCounts: {
				date: `${this.model.date.year}-${this.model.date.month}-${this.model.date.day}`,
				steps: this.model.steps,
				email: this.model.email
			}
		};

		this.dataService.postManualSync(manualSyncUrl, manualSyncModel).subscribe(res => {
			console.log(res);
			if (res) {
				this.router.navigate(['/']);
			}
		}, err => {
			console.log(err);
		});
	}

}
