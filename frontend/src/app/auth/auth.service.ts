import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private graphQLEndpoint = 'http://localhost:3000/graphql';
    public currentUser = '';

    constructor(private http: HttpClient, public router: Router) {}

    signUpUser(newCredentials: object) {
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };

        return this.http.post(this.graphQLEndpoint, JSON.stringify(newCredentials), httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    logInUser(userCredentials: object) {
      const httpOptions = {
        headers: new HttpHeaders({'Content-Type': 'application/json'})
      };

      this.http.post<any>(this.graphQLEndpoint, JSON.stringify(userCredentials), httpOptions)
      .pipe(
        catchError(this.handleError)
      )
      .subscribe((result: any) => {
        // Store Authentication Token information in Local Storage
        localStorage.setItem('token', result.data.login.token);
        localStorage.setItem('token_expiration', result.data.login.tokenExpiration);
        localStorage.setItem('userId', result.data.login.userId);
      });

      this.router.navigate(['events']);
    }

    getToken() {
      return localStorage.getItem('token');
    }

    public isAuthenticated(): boolean {
      const userToken = localStorage.getItem('token');
      if (userToken) {
        this.currentUser = localStorage.getItem('userId');
        return true;
      } else {
        return false;
      }
    }

    logOut() {
      const removedToken = localStorage.removeItem('token');
      if (removedToken == null) {
        this.currentUser = '';
        this.router.navigate(['auth']);
      }
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
          'Something bad happened; please try again later.');
      }
}
