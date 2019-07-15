import { Component, OnInit, NgZone } from '@angular/core';
import { GoogleFitService } from '../../services/google-fit.service';
import { DataService } from 'src/app/services/data.service';
import { SharedConstants } from 'src/app/constants/shared.constants';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
	selector: 'app-sync',
	templateUrl: './sync.component.html',
	styleUrls: ['./sync.component.less']
})
export class SyncComponent implements OnInit {
	private isStepsCounted = false;
	private stepCounts = [];
	private totalStepCount = 0;
	private googleAuthUrl = SharedConstants.GoogleAuthUrl;
	private tempMessage = '';

	public getGmail(): string {
		if (localStorage.getItem('gmail')) {
			return localStorage.getItem('gmail');
		}
		return null;
	}

	constructor(
		private ngZone: NgZone,
		private googleFitService: GoogleFitService,
		private dataService: DataService,
		private cookieService: CookieService
	) { }

	ngOnInit() {
		if (this.cookieService.getCookie('access_token') && this.cookieService.getCookie('gmail')) {
			localStorage.setItem('googleoauth', this.cookieService.getCookie('access_token'));
			localStorage.setItem('gmail', decodeURIComponent(this.cookieService.getCookie('gmail')));
		}
	}

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
		const syncDataUrl = `/api/v1/sync`;

		this.dataService.getSyncData(syncDataUrl).subscribe(
			(res: any) => {
				if (res.tokenRefreshed) {
					console.log('token refreshed');
					localStorage.setItem('googleoauth', res.token);
					this.cookieService.createCookie('access_token', res.token, 30);
					this.getSyncData();
				}
				console.log(res);
				if (res.message) {
					this.tempMessage = res.message;
				}
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
						, 0);
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
