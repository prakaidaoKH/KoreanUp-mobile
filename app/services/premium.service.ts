import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  PremiumApply,
  PremiumApplyServiceApiResponse,
  StatusPremiumApplyDetailServiceApiResponse,
  StatusPremiumApplyServiceApiResponse,
} from '../models/premiumApply-model';

@Injectable({
  providedIn: 'root',
})
export class PremiumService {
  apiUrl = 'http://localhost/koreanUp/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  apply(
    premiumApply: PremiumApply
  ): Observable<PremiumApplyServiceApiResponse> {
    return this.httpClient
      .post<PremiumApplyServiceApiResponse>(
        this.apiUrl + 'uploadSlip.php',
        premiumApply,
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          // console.log('list of members');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }
  statusDefault(id: number): Observable<StatusPremiumApplyServiceApiResponse> {
    return this.httpClient
      .post<StatusPremiumApplyServiceApiResponse>(
        this.apiUrl + 'query-applyStatus.php',
        { memberID: id },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          // console.log('list of members');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }
  statusApply(
    id: number
  ): Observable<StatusPremiumApplyDetailServiceApiResponse> {
    return this.httpClient
      .post<StatusPremiumApplyDetailServiceApiResponse>(
        this.apiUrl + 'query-applyStatus.php',
        { memberID: id },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          // console.log('list of members');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }
  deletePremiumMember(id: number): Observable<PremiumApplyServiceApiResponse> {
    return this.httpClient
      .post<PremiumApplyServiceApiResponse>(
        this.apiUrl + 'delete-premium.php',
        {
          MemberID: id,
        },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          // console.log('list of members');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }

  updateNotic(id: number): Observable<PremiumApplyServiceApiResponse> {
    return this.httpClient
      .post<PremiumApplyServiceApiResponse>(
        this.apiUrl + 'updateNotic.php',
        {
          memberID: id,
        },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          // console.log('list of members');
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
