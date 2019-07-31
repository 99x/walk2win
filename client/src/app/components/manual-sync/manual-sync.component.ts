import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';

import { DataService } from 'src/app/services/data.service';
@Component({
	selector: 'app-manual-sync',
	templateUrl: './manual-sync.component.html',
	styleUrls: ['./manual-sync.component.less']
})
export class ManualSyncComponent implements OnInit {

	constructor(
		private dataService: DataService,
		private router: Router,
		private spinner: NgxSpinnerService) { }

	model: any = {};
	displayError: string;
	dateError = false;

	public getGmail(): string {
		if (localStorage.getItem('gmail')) {
			return localStorage.getItem('gmail');
		}
		return null;
	}

	ngOnInit() {
		this.model.email = this.getGmail();
	}

	onSubmit() {
		if (this.model.steps > 60000) {
			return;
		}
		const date = `${this.model.date.year}-0${this.model.date.month}-${this.model.date.day}`;
		if (!moment(date).isSameOrBefore(moment())) {
			this.dateError = true;
			return;
		} else {
			this.dateError = false;
		}
		this.spinner.show();


		const manualSyncUrl = '/api/v1/syncmanual';
		const manualSyncModel = {
			stepCounts: {
				date,
				steps: this.model.steps,
				email: this.model.email
			}
		};

		this.dataService.postManualSync(manualSyncUrl, manualSyncModel).subscribe((res: any) => {
			console.log(res);
			this.spinner.hide();
			if (res.error) {
				this.displayError = `${res.message}. If you want to join please contact the organizers. `;
			} else {
				this.router.navigate(['/'], { state: { isManualSync: true, syncResp: res } });
			}
		}, err => {
			console.log(err);
		});
	}

}
