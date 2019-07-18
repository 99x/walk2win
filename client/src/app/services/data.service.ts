import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';

import { environment } from 'src/environments/environment';
@Injectable()
export class DataService {

	constructor(private http: HttpClient) { }

	private buildHttpOptions(): any {
		return {
			headers: new HttpHeaders({
				Authorization: this.createBearerToken(),
				gmail: decodeURIComponent(localStorage.getItem('gmail'))
			})
		};
	}

	private createBearerToken(): string {
		return `Bearer ${localStorage.getItem('googleoauth')}`;
	}

	private createUrl(url: string): string {
		return environment.baseApi + url;
	}

	/**
	 * Get google fit sync data
	 * @param url the api endpoint url to be called
	 */
	getSyncData(url: string) {
		return from(this.http.get(this.createUrl(url), this.buildHttpOptions()));
	}


	/**
	 * Get Team leaderboard values for male, female or individual
	 * @param url the api endpoint url to be called
	 */
	public getTeamsLeaderboardValues(url: string) {
		return from(this.http.get(this.createUrl(url)));
	}

}
