import { Injectable } from '@angular/core';

@Injectable()
export class SharedConstants {
	public static GoogleAuth = 'client:auth2';
	public static GoogleAuthUrl = 'd32d2ytfhn26li.cloudfront.net/api/v1/auth/google';
	public static GoogleFitnessApiScope = 'https://www.googleapis.com/auth/fitness.activity.read';
	public static GoogleFitnessApiUrl = 'https://content.googleapis.com/discovery/v1/apis/fitness/v1/rest';
	public static GoogleFitDataTypeName = 'com.google.step_count.delta';
	public static GoogleFitUserId = 'me';
	public static GoogleFitDataSourceId = 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps'
}
