import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedConstants } from '../constants/shared.constants';

declare var gapi;

@Injectable()
export class GoogleFitService {

	public isSignedIn = false;
	public loggedInEmail = '';

	constructor() {
		gapi.load(SharedConstants.GoogleAuth, () => {
			gapi.auth2.init({
				client_id: environment.client_id

			});
		});
	}

	init() {
		return new Promise((resolve, reject) => {
			try {
				this.authenticate().then(this.loadClient).then(() => {
					resolve();
				});
			} catch (error) {
				reject(error);
			}
		});
	}

	public authenticate() {
		return gapi.auth2
			.getAuthInstance()
			.signIn({
				scope: SharedConstants.GoogleFitnessApiScope
			})
			.then(
				() => {
					localStorage.setItem('googleoauth', gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
					localStorage.setItem('gmail', gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail());
					this.isSignedIn = true;
				},
				err => {
					console.error(err);
				}
			);
	}

	public loadClient() {
		gapi.client.setApiKey(environment.apiKey);
		return gapi.client
			.load(SharedConstants.GoogleFitnessApiUrl)
			.then(
				() => {
					console.log('GAPI client loaded for API');
				},
				err => {
					console.error(err);
				}
			);
	}

	public getGmail(): string {
		if (localStorage.getItem('gmail')) {
			return localStorage.getItem('gmail');
		}
		return null;
	}

	checkCount(timeGap: any): Observable<any> {
		return new Observable<any>((observer: Observer<any>) => {
			return gapi.client.fitness.users.dataset
				.aggregate({
					userId: SharedConstants.GoogleFitUserId,
					resource: {
						aggregateBy: [
							{
								dataTypeName: SharedConstants.GoogleFitDataTypeName,
								dataSourceId: SharedConstants.GoogleFitDataSourceId
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
						const stepVals = [];
						response.result.bucket.forEach(element => {
							if (element.dataset[0].point[0]) {
								stepVals.push(element.dataset[0].point[0].value[0].intVal);
							}
						});
						console.log(response);
						observer.next(response.result);
						observer.complete();
					},
					err => {
						console.error(err);
						observer.error(err);
						observer.complete();

					}
				);
		});
	}


}
