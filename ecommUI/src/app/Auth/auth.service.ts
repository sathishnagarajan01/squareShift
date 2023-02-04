import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private loggedIn: boolean = false;
	constructor() { }

	logIn() {
		this.loggedIn = true;
	}

	logOut() {
		this.loggedIn = false;
	}

	isAuthenticated() {
		return this.loggedIn;
	}
}
