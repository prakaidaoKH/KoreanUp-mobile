import { Injectable } from '@angular/core';
import { CommentServiceApiResponse } from '../models/comment-model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  apiUrl = 'http://localhost/koreanUp/course/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };
  constructor(private httpClient: HttpClient) {}
  comment(
    courseID: number,
    memberID: number
  ): Observable<CommentServiceApiResponse> {
    return this.httpClient
      .post<CommentServiceApiResponse>(
        this.apiUrl + 'commentCourse.php',
        {
          course_id: courseID,
          member_id: memberID,
        },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          // console.log('list of members');
        }),
        catchError(this.handleError)
      );
  }
  commentAdmin(courseID: number): Observable<CommentServiceApiResponse> {
    return this.httpClient
      .post<CommentServiceApiResponse>(
        this.apiUrl + 'commentCourseAdmin.php',
        {
          id: courseID,
        },
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          // console.log('list of members');
        }),
        catchError(this.handleError)
      );
  }
  addComment(
    memberID: number,
    courseID: number,
    message: string
  ): Observable<CommentServiceApiResponse> {
    return this.httpClient
      .post<CommentServiceApiResponse>(
        this.apiUrl + 'addComment.php',
        {
          memberID: memberID,
          courseID: courseID,
          message: message,
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
