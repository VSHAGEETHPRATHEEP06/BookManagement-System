import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Book } from '../models/book.model';
import { AuthorBookCount, DashboardSummary } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:5000/api/dashboard';

  constructor(private http: HttpClient) { }

  getLatestBooks(count: number = 5): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/latest-books?count=${count}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getOldestBooks(count: number = 10): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.apiUrl}/oldest-books?count=${count}`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getBooksByAuthor(): Observable<AuthorBookCount[]> {
    return this.http.get<AuthorBookCount[]>(`${this.apiUrl}/books-by-author`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}