import { Injectable, OnInit } from '@angular/core';
import { Observable, from, Observer } from 'rxjs';

declare var gapi;

@Injectable()
export class GoogleFitService {
	public isSignedIn = false;
	constructor() {
		gapi.load('client:auth2', () => {
			gapi.auth2.init({
				client_id:
					'195162494249-aqt60jap5s951apfubo2auvclde0ge9i.apps.googleusercontent.com'
			});
		});
	}

	init() {
		return new Promise((resolve, reject) => {
			console.log('called init');
			this.authenticate().then(this.loadClient);
			resolve();
		});
	}

	public authenticate() {
		return gapi.auth2
			.getAuthInstance()
			.signIn({
				scope: 'https://www.googleapis.com/auth/fitness.activity.read'
			})
			.then(
				() => {
					console.log('Sign-in successful');
				},
				err => {
					console.error('Error signing in', err);
				}
			);
	}

	public loadClient() {
		gapi.client.setApiKey('AIzaSyDadiChkwWKcG_eIRR5tErt22AeUq8oF6U');
		return gapi.client
			.load('https://content.googleapis.com/discovery/v1/apis/fitness/v1/rest')
			.then(
				() => {
					console.log('GAPI client loaded for API');
				},
				err => {
					console.error('Error loading GAPI client for API', err);
				}
			);
	}

	checkCount(timeGap: any): Observable<any> {
		return new Observable<any>((observer: Observer<any>) => {
			return gapi.client.fitness.users.dataset
				.aggregate({
					userId: 'me',
					resource: {
						aggregateBy: [
							{
								dataTypeName: 'com.google.step_count.delta',
								dataSourceId:
									'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
							}
						],
						endTimeMillis: timeGap.endTimeMillis,
						startTimeMillis: timeGap.startTimeMillis,
						bucketByTime: {
							durationMillis: 86400000
						}
					}
				})
				.then(
					response => {
						// Handle the results here (response.result has the parsed body).
						const stepVals = [];
						response.result.bucket.forEach(element => {
							if (element.dataset[0].point[0]) {
								stepVals.push(element.dataset[0].point[0].value[0].intVal);
							}
						});
						console.log('response', response);
						observer.next(response.result);
						observer.complete();
						// return response;
						// this.ngZone.run(() => {
						// 	this.stepResp = stepVals;
						// });
						// this.stepResp = stepVals;
						// console.log('this.stepResp', this.stepResp);
					},
					err => {
						console.error('Execute error', err);
						observer.error(err);
						observer.complete();
						// return err;
						// this.stepResp = null;
					}
				);
		});
	}
}
