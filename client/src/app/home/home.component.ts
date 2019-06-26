import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

import { AuthService } from 'angularx-social-login';
import { SocialUser } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

	user: SocialUser;

	constructor(private authService: AuthService) { }

	ngOnInit() {
		this.authService.authState.subscribe((user) => {
			this.user = user;
			console.log(user);
		});
	}

	signInWithGoogle(): void {
		this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
	}

	signOut(): void {
		this.authService.signOut();
	}

}