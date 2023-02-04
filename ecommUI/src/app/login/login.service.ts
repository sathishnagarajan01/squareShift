import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class LoginService {
    constructor(private http: HttpClient) {}

	login(payload: any): Observable<any> {
		const url = `${environment.apiUrl}/login`;
		const headers = new HttpHeaders(
			{'Content-Type': 'application/json'}
		)
		/*const params = new HttpParams()
			.set('', '');*/
		return this.http.post(url, payload, {headers})
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
