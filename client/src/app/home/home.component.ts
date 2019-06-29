import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleFitService } from '../services/google-fit.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	public stepResp = null;
	private isSignedIn = false;
	private stepCounts = [];
	constructor(
		private ngZone: NgZone,
		private googleFitService: GoogleFitService
	) { }

	ngOnInit() { }

	signIn() {
		this.googleFitService
			.init()
			.then(() => {
				this.isSignedIn = true;
			})
			.catch(err => {
				console.log(err);
			});
	}

	viewStepCount() {
		console.log('viewStepCount');
		const timeGap = {
			endTimeMillis: 1561652514300,
			startTimeMillis: 1561228200000
		};
		this.googleFitService.checkCount(timeGap).subscribe(
			resp => {
				console.log(resp);
				resp.bucket.forEach(element => {
					if (element.dataset[0].point[0]) {
						this.stepCounts.push({
							dateSteps: new Date(+element.endTimeMillis),
							stepsPerDay: element.dataset[0].point[0].value[0].intVal
						});
					}
				});
				this.ngZone.run(() => { });
			},
			err => {
				console.log('error view steps');
			}
		);
	}
}
