import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ProductService {

	constructor(private http: HttpClient) { }

	getProduct(id: number) {
		const url = `http://15.206.157.204:8080/product/${id}`;
		const headers = new HttpHeaders(
			{'Content-Type': 'application/json'}
		)
		return this.http.get(url, {headers})
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
