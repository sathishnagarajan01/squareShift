import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CartService {

	constructor(private http: HttpClient) { }

	addToCart(payload: any) {
		const url = `${environment.apiUrl}/cart/item`;
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${sessionStorage.getItem('token')}`
			}
		)
		return this.http.post(url, payload, {headers})
			.pipe(catchError(this.handleError));
	}

	getCartList() {
		const url = `${environment.apiUrl}/cart/items`;
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${sessionStorage.getItem('token')}`
			}
		)
		return this.http.get(url, {headers})
			.pipe(catchError(this.handleError));
	}

	deleteCartItems() {
		const url = `${environment.apiUrl}/cart`;
		const headers = new HttpHeaders(
			{
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${sessionStorage.getItem('token')}`
			}
		)
		return this.http.delete(url, {headers})
			.pipe(catchError(this.handleError));
	}

	handleError(error: HttpErrorResponse) {
		let errMessage = '';
		if(error.status === 0) {
			errMessage = 'Server Down';
		} else {
			errMessage = error.statusText;
		}
		console.log(error);
		return throwError(() => new Error(errMessage));
	}
}
