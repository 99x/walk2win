import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleFitService } from '../../services/google-fit.service';
import { DataService } from 'src/app/services/data.service';

@Component({
	selector: 'app-sync',
	templateUrl: './sync.component.html',
	styleUrls: ['./sync.component.less']
})
export class SyncComponent implements OnInit {
	private isStepsCounted = false;
	private stepCounts = [];
	private totalStepCount = 0;

	public getGmail(): string {
		return localStorage.getItem('gmail');
	}

	constructor(
		private ngZone: NgZone,
		private googleFitService: GoogleFitService,
		private dataService: DataService
	) { }

	ngOnInit() { }

	signIn() {
		if (!localStorage.getItem('googleoauth')) {
			this.googleFitService
				.init()
				.then(() => {
					console.log('inited');
					this.getSyncData();
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			this.getSyncData();
		}
	}

	getSyncData() {
		const syncDataUrl = `/api/v1/sync?gmail=${this.getGmail()}`;

		this.dataService.getSyncData(syncDataUrl).subscribe(
			(res: any) => {
				console.log(res);
			},
			err => {
				console.log(err);
			});
	}

	viewStepCount() {
		const timeGap = {
			endTimeMillis: +new Date(),
			startTimeMillis: 1561228200000 // TODO get date from API
		};
		this.googleFitService.checkCount(timeGap).subscribe(
			resp => {
				console.log(resp);
				this.ngZone.run(() => {
					resp.bucket.forEach(element => {
						if (element.dataset[0].point[0]) {
							this.stepCounts.push({
								dateSteps: new Date(+element.endTimeMillis),
								stepsPerDay: element.dataset[0].point[0].value[0].intVal
							});
						}
					});
					this.totalStepCount = this.stepCounts.reduce((total, current) =>
						total + current.stepsPerDay
						, 0)
					this.isStepsCounted = true;
				});
			},
			err => {
				console.log('error view steps');
			}
		);
	}

	syncWithApi() {
		this.googleFitService.syncData(this.stepCounts, this.totalStepCount);
	}

}
