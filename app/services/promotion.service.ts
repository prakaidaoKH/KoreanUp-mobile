import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  PromotionServiceApiResponse,
  PromotionServiceDetailApiResponse,
} from '../models/promotion-model';

@Injectable({
  providedIn: 'root',
})
export class PromotionService {
  apiUrl = 'http://localhost/koreanUp/promotion/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  promotion(): Observable<PromotionServiceApiResponse> {
    return this.httpClient
      .post<PromotionServiceApiResponse>(
        this.apiUrl + 'query-promotion.php',
        null,
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          console.log('list of exam');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }
  promotionID(id: any): Observable<PromotionServiceDetailApiResponse> {
    return this.httpClient
      .post<PromotionServiceDetailApiResponse>(
        this.apiUrl + 'promotionByID.php',
        { proID: id },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          console.log('list of exam');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(() => error);
  }
}
