import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SharedConstants } from '../constants/shared.constants';
import { NgxSpinnerService } from "ngx-spinner";

declare var gapi;
declare var google;

@Injectable()
export class GoogleFitService {
  public isSignedIn = false;
  public loggedInEmail = "";

  public client;
  public access_token;

  constructor(private spinner: NgxSpinnerService) {
    console.log("Constructor");
  }

  initClient() {
    console.log("Inside initLCient");
	this.loadGapi();
    this.client = google.accounts.oauth2.initTokenClient({
      client_id: environment.client_id,
      scope: SharedConstants.GoogleFitnessApiScope,
      callback: (tokenResponse) => {
        console.log(tokenResponse);
        if (tokenResponse && tokenResponse.access_token) {
          if (
            google.accounts.oauth2.hasGrantedAnyScope(
              tokenResponse,
              SharedConstants.GoogleFitnessApiScope
            ) ||
            1 == 1
          ) {
            try {
              // this.access_token = this.client.requestAccessToken();
              // localStorage.setItem('googleoauth', this.access_token);
              // console.log(this.access_token);
              console.log("Got token");
              this.access_token = tokenResponse.access_token;
              this.getUserInfo(this.access_token);
              //this.isSignedIn = true;
            } catch (error) {
              console.log(error);
            }
          } else {
            console.log("No Access");
          }
        } else {
          console.log("Didnt get the token");
        }
      },
    });

    this.client.requestAccessToken();
  }

  loadGapi(){
	gapi.load('client', async()=>{
		await gapi.client.init({
			apiKey: environment.apiKey,
			discoveryDocs: [SharedConstants.GoogleFitnessApiUrl],
		});
		console.log("Gapi is Loaded")
	})
  }

  async calculateStepCount() {
	console.log(this.access_token);
    const apiUrl =
      "https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate";

    // Set the start and end times for the data you want to retrieve
    const startTimeMillis = Date.now() - 86400000; // 24 hours ago
    const endTimeMillis = Date.now();

    // Prepare the request body
    const requestBody = {
      aggregateBy: [{ dataTypeName: "com.google.step_count.delta" }],
      bucketByTime: { durationMillis: 86400000 }, // 1 day in milliseconds
      startTimeMillis,
      endTimeMillis,
    };

    // Make the API request
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      console.log("Step count data:", data);

      //Extract the step count from the response
      const stepCount = data.bucket[0].dataset[0].point[0].value[0].intVal;
      console.log("Step count:", stepCount);

      return data;
      //Do something with the step count, like displaying it on the UI
      //return stepCount;
    } catch (error) {
      console.error("Error fetching step count:", error);
      // Handle the error gracefully
    }
  }

  async getUserInfo(accessToken) {
    const apiUrl = `https://people.googleapis.com/v1/people/me?personFields=emailAddresses`;

    // Make the API request
    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      const userEmail = data.emailAddresses[0].value;
      localStorage.setItem("gmail", userEmail);
      this.isSignedIn = true;
	  this.spinner.hide();
    } catch (error) {
      console.error("Error fetching Gmail:", error);
      // Handle the error gracefully
    }
  }

  public init() {
    try {
		
      this.initClient();
    } catch (error) {
      return error;
    }
  }
  public getGmail(): string {
    if (localStorage.getItem("gmail")) {
      return localStorage.getItem("gmail");
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
                dataSourceId: SharedConstants.GoogleFitDataSourceId,
              },
            ],
            endTimeMillis: timeGap.endTimeMillis,
            startTimeMillis: timeGap.startTimeMillis,
            bucketByTime: {
              durationMillis: 86400000,
            },
          },
        })
        .then(
          (response) => {
			console.log(response)
            const stepVals = [];
            response.result.bucket.forEach((element) => {
              if (element.dataset[0].point[0]) {
                stepVals.push(element.dataset[0].point[0].value[0].intVal);
              }
            });
            console.log(response);
            observer.next(response.result);
            observer.complete();
          },
          (err) => {
            console.error(err);
            observer.error(err);
            observer.complete();
          }
        );
    });
  }
}