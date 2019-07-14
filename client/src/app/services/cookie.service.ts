import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

	getCookie(name) {
		const nameEQ = name + '=';
		const ca = document.cookie.split(';');
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) == ' ') { c = c.substring(1, c.length); }
			if (c.indexOf(nameEQ) == 0) { return c.substring(nameEQ.length, c.length); }
		}
		return null;
	}

	createCookie(name, value, days) {
		let expires;
		if (days) {
			const date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = '; expires=' + date.toUTCString();
		} else { expires = ''; }
		document.cookie = name + '=' + value + expires + '; path=/';
	}
}