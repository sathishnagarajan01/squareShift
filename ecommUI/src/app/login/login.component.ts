import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Auth/auth.service';
import { LoginService } from './login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	public LoginForm!: FormGroup;
	public formSubmitted: boolean = false;
	public errMsg!: string;
	public errMsgStatus: boolean = false;

	constructor(
		private fb: FormBuilder,
		private loginService: LoginService,
		private router: Router,
		private authService: AuthService,
	) {
		this.LoginForm = this.fb.group({
			'username': ['', Validators.required],
			'password': ['', Validators.required]
		});
	}

	ngOnInit() {
	}

	get loginFromControl() {
		return this.LoginForm.controls;
	}

	setToken(token: string) {
		console.log(token);
		sessionStorage.setItem('token', token);
		this.authService.logIn();
		console.log(this.authService.isAuthenticated());
		console.log(sessionStorage.getItem('token'));
		this.router.navigate(['/product']);
	}

	submitLogin() {
		this.formSubmitted = true;
		if(this.LoginForm.valid) {
			this.loginService.login(this.LoginForm.value)
			.subscribe({
				next: (token) => {
					this.setToken(token);
				},
				error: (err) => {
					this.errMsgStatus = true;
					this.errMsg = err;
				},
				complete: () => {
					console.log('login service finally');
				}
			});
		}
	}
}
