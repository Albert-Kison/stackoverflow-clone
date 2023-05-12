import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  registerUrl = "https://rocky-reaches-32477.herokuapp.com/api/signup";
  loginUrl = "https://rocky-reaches-32477.herokuapp.com/api/signin";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private router: Router) { }

  addUser(user: any): Observable<any> {
    console.log(JSON.stringify(user));
    return this.http.post<any>(this.registerUrl, JSON.stringify(user), this.httpOptions).pipe(
      tap(() => console.log("request made")),
      catchError(this.handleError)
    );
  }

  addExpert(user: any): Observable<any> {
    console.log(JSON.stringify(user));
    return this.http.post<any>("https://rocky-reaches-32477.herokuapp.com/api/expertSignUp", JSON.stringify(user), this.httpOptions).pipe(
      tap(() => console.log("request made")),
      catchError(this.handleError)
    );
  }

  loginUser(user: any) {
    return this.http.post<any>(this.loginUrl, user, this.httpOptions).pipe(
      tap(() => console.log("request made")),
      catchError(this.handleError)
    );
  }

  getToken() {
    return localStorage.getItem("token");
  }

  loggedIn() {
    return !!localStorage.getItem("token");
  }

  logoutUser() {
    localStorage.removeItem("token");
    this.router.navigate(["/"]);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error.message));
  }
}
