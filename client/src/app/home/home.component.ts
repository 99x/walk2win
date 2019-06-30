import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleFitService } from '../services/google-fit.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	private stepResp = null;
	private isStepsCounted = false;
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
				console.log('inited');
			})
			.catch(err => {
				console.log(`${err} init`);
			});
	}

	viewStepCount() {
		const timeGap = {
			endTimeMillis: +new Date(),
			startTimeMillis: 1561228200000
		};
		this.googleFitService.checkCount(timeGap).subscribe(
			resp => {
				console.log(resp);
				resp.stepResponse.bucket.forEach(element => {
					if (element.dataset[0].point[0]) {
						this.stepCounts.push({
							dateSteps: new Date(+element.endTimeMillis),
							stepsPerDay: element.dataset[0].point[0].value[0].intVal,
							playerGmail: resp.playerGmail
						});
					}
				});
				this.ngZone.run(() => {
					this.isStepsCounted = true;
				});
			},
			err => {
				console.log('error view steps');
			}
		);
	}
}
