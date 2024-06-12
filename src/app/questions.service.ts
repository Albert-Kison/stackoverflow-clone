import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  questionsUrl = "https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/getQuestions";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  httpOptionsImage = {
    headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
  };
  private searchResults?: any[];
  questions: any[] = [];
  answers: any[] = [];
  question?: any;

  constructor(private http: HttpClient) { }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.questionsUrl, this.httpOptions).pipe(
      tap((res) => this.questions = res),
      catchError(this.handleError)
    );
  }

  getQuestion(id: string): Observable<any> {
    this.question = {};
    return this.http.get<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/search/${id}`, this.httpOptions).pipe(
      tap((res) => {
        this.question = res;
      }),
      catchError(this.handleError)
    );
  }

  searchByText(text: string): Observable<any[]> {
    console.log(text);
    
    return this.http.post<any[]>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/search/text`, {text: text}, this.httpOptions).pipe(
      tap((res) => this.questions = res),
      catchError(this.handleError)
    );
  }

  setSearchResults(results: any[]): void {
    this.searchResults = results;
  }

  getSearchResults(): any[] {
    return this.searchResults as any[];
  }

  addQuestion(question: any): Observable<any[]> {
    return this.http.post<any[]>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions`, JSON.stringify(question), this.httpOptions).pipe(
      tap((res) => this.questions.unshift(res)),
      // catchError(this.handleError)
    );
  }

  editQuestion(question: any, id: number): Observable<any> {
    return this.http.post<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions/${id}`, JSON.stringify(question), this.httpOptions).pipe(
      tap((res) => {this.question = res}),
      catchError(this.handleError)
    );
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions/${id}`, this.httpOptions).pipe(
      tap((res) => {this.question = null}),
      catchError(this.handleError)
    );
  }

  addAnswer(answer: any): Observable<any> {
    return this.http.put<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions/answers/${answer.questionId}`, JSON.stringify(answer), this.httpOptions).pipe(
      tap((res) => this.question = res),
      catchError(this.handleError)
    );
  }

  editAnswer(answer: any, answerId: any): Observable<any> {
    return this.http.patch<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions/${answer.questionId}/answers/${answerId}`, JSON.stringify(answer), this.httpOptions).pipe(
      tap((res) => this.question = res),
      catchError(this.handleError)
    );
  }

  deleteAnswer(questionId: any, answerId: any): Observable<any> {
    return this.http.delete<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions/${questionId}/answers/${answerId}`, this.httpOptions).pipe(
      tap((res) => this.question = res),
      catchError(this.handleError)
    );
  }

  approveAnswer(answerId: any, questionId: any): Observable<any> {
    return this.http.patch<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions/${questionId}/answers/${answerId}/approve`, this.httpOptions).pipe(
      tap((res) => {
        
        console.log(res);
        
        this.answers = res.answers;
        this.question = res;
      }),
      catchError(this.handleError)
    );
  }

  upvoteAnswer(answerId: any, questionId: any): Observable<any> {
    return this.http.patch<any>(`https://stackoverflow-server-2f04cff194e7.herokuapp.com/api/questions/${questionId}/answers/${answerId}/upvote`, this.httpOptions).pipe(
      tap((res) => {
        console.log("wehf ewfhierhfier f8h");
        
        console.log(res);
        
        this.question = res;
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
