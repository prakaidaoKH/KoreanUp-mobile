import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  CourseServiceApiResponse,
  CourseServiceDetailApiResponse,
  MyCourseServiceApiResponse,
  MyCourseServiceDetailApiResponse,
} from '../models/course-model';
import { tap, catchError } from 'rxjs/operators';
import { AddMyCourseServiceApiResponse } from '../models/addMycourse-model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiUrl = 'http://localhost/koreanUp/course/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  constructor(private httpClient: HttpClient) {}

  inquiryCourse(): Observable<CourseServiceApiResponse> {
    console.log('call inquiryCourse in course-service');
    return this.httpClient
      .post<CourseServiceApiResponse>(
        this.apiUrl + 'course-query.php',
        null,
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          console.log('list of course');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }
  courseByID(id: number): Observable<CourseServiceDetailApiResponse> {
    return this.httpClient
      .post<CourseServiceDetailApiResponse>(
        this.apiUrl + 'courseByID.php',
        {
          courseID: id,
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
  myCourse(id: number): Observable<MyCourseServiceApiResponse> {
    return this.httpClient
      .post<MyCourseServiceApiResponse>(
        this.apiUrl + 'myCourse-query.php',
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
  myCourseTwo(
    id: number,
    course_id: number
  ): Observable<MyCourseServiceDetailApiResponse> {
    return this.httpClient
      .post<MyCourseServiceDetailApiResponse>(
        this.apiUrl + 'myCourseTwo.php',
        {
          MemberID: id,
          CourseID: course_id,
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
  addMyCourse(
    cID: number,
    mID: number
  ): Observable<AddMyCourseServiceApiResponse> {
    return this.httpClient
      .post<AddMyCourseServiceApiResponse>(
        this.apiUrl + 'addInMyCourse.php',
        {
          memberID: mID,
          courseID: cID,
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
