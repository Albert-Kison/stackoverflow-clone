import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questionsUrl = "https://rocky-reaches-32477.herokuapp.com/api/getQuestions";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private searchResults?: any[];

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.questionsUrl, this.httpOptions).pipe(
      tap(() => console.log("request made")),
      catchError(this.handleError)
    );
  }

  getQuestion(id: string): Observable<any[]> {
    return this.http.get<any[]>(`https://rocky-reaches-32477.herokuapp.com/api/search/${id}`, this.httpOptions).pipe(
      tap(() => console.log("request made")),
      catchError(this.handleError)
    );
  }

  searchByText(text: string): Observable<any[]> {
    return this.http.post<any[]>(`https://rocky-reaches-32477.herokuapp.com/api/search/text`, {text: text}, this.httpOptions).pipe(
      tap(() => console.log("request made")),
      catchError(this.handleError)
    );
  }

  setSearchResults(results: any[]): void {
    this.searchResults = results;
  }

  getSearchResults(): any[] {
    return this.searchResults as any[];
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
