import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-manual-sync',
	templateUrl: './manual-sync.component.html',
	styleUrls: ['./manual-sync.component.less']
})
export class ManualSyncComponent implements OnInit {

	constructor(
		private dataService: DataService,
		private router: Router) { }

	model: any = {};
	displayError: string;

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
		if (this.model.steps > 40000) {
			return;
		}

		const manualSyncUrl = '/api/v1/syncmanual';
		const manualSyncModel = {
			stepCounts: {
				date: `${this.model.date.year}-${this.model.date.month}-${this.model.date.day}`,
				steps: this.model.steps,
				email: this.model.email
			}
		};

		this.dataService.postManualSync(manualSyncUrl, manualSyncModel).subscribe((res: any) => {
			console.log(res);

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
