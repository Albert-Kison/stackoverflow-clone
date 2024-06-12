import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl = "https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/users";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  users: any[] = [];

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.usersUrl, this.httpOptions).pipe(
      tap((res) => this.users = res),
      catchError(this.handleError)
    );
  }

  editUser(user: any, id: number): Observable<any> {
    return this.http.post<any>(`${this.usersUrl}/${id}`, user, this.httpOptions).pipe(
      tap((res) => {
        const updatedIndex = this.users.findIndex(user => user._id === res._id);
        if (updatedIndex !== -1) {
          this.users[updatedIndex] = res;
        }
      }),
      catchError(this.handleError)
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.usersUrl}/${id}`, this.httpOptions).pipe(
      tap((res) => {
        this.users = this.users.filter(user => user._id !== id);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.log("Error in questionService: ", error.error);
    
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(`Backend returned code ${error.status}, body was: `, error.error);
      }
    } else {
      // Handle other types of errors (e.g., non-HTTP errors)
      console.error('An error occurred:', error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(JSON.stringify(error)));
  }
}
