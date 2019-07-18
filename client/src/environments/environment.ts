// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	baseApi: 'http://localhost:3003',
	client_id: 'YOUR_CLIENT_ID',
	apiKey: 'YOUR_API_KEY',
	googleAuthUrl: 'http://ec2-18-218-3-5.us-east-2.compute.amazonaws.com/api/v1/auth/google'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
