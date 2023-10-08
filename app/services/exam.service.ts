import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import {
  ExamServiceApiResponse,
  TakeExam,
  TakeExamServiceApiResponse,
  TakeExamServiceDetailApiResponse,
} from '../models/exam-models';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  apiUrl = 'http://localhost/koreanUp/exam/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  exam(id: number): Observable<ExamServiceApiResponse> {
    return this.httpClient
      .post<ExamServiceApiResponse>(
        this.apiUrl + 'query-exam.php',
        {
          courseID: id,
        },
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
  addTakeExam(take_exams: TakeExam): Observable<TakeExamServiceApiResponse> {
    return this.httpClient
      .post<TakeExamServiceApiResponse>(
        this.apiUrl + 'insert-takeExam.php',
        take_exams,
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
  takeExam(
    course_id: number,
    member_id: number
  ): Observable<TakeExamServiceDetailApiResponse> {
    return this.httpClient
      .post<TakeExamServiceDetailApiResponse>(
        this.apiUrl + 'take-exam.php',
        {
          courseID: course_id,
          memberID: member_id,
        },
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
