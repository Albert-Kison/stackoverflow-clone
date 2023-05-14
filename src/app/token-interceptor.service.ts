import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector, private router: Router) { }

  intercept(req: any, next: any) {
    let authService = this.injector.get(AuthService);
    let tokenizedReg = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReg).pipe(
      catchError((error) => {
        console.log("Error in intercept: ", error);
        
        authService.error = error;
        if (error.status === 401) {
          // Handle unauthorized error (e.g., redirect to login page)
          this.router.navigate(["/login"])
        } else if (error.status === 403) {
          // Handle forbidden error (e.g., show an error message)
        }

        return throwError(() => new Error(error));
      })
    );
  }
}
