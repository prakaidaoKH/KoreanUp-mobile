import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {
  Member,
  MemberServiceApiResponse,
  MemberDetailServiceApiResponse,
  MemberLoginDetailServiceApiResponse,
  MemberForgetPassServiceApiResponse,
  MemberForgetPassDetailServiceApiResponse,
  MemberLogin,
} from '../models/member-model';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  apiUrl = 'http://localhost/koreanUp/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  };

  constructor(private httpClient: HttpClient) {}

  inquiryMember(): Observable<MemberServiceApiResponse> {
    console.log('call inquiryMember in member-service');
    return this.httpClient
      .post<MemberServiceApiResponse>(
        this.apiUrl + 'member.php',
        null,
        this.httpOptions
      )
      .pipe(
        tap((response) => {
          console.log('list of members');
          console.log(response);
        }),
        catchError(this.handleError)
      );
  }
  addMember(member: Member): Observable<MemberServiceApiResponse> {
    return this.httpClient
      .post<MemberServiceApiResponse>(
        this.apiUrl + 'create-member.php',
        member,
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
  addMemberGoogle(member: Member): Observable<MemberServiceApiResponse> {
    return this.httpClient
      .post<MemberServiceApiResponse>(
        this.apiUrl + 'create-member-google.php',
        member,
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
  deleteMember(memberID: number): Observable<MemberServiceApiResponse> {
    return this.httpClient
      .post<MemberServiceApiResponse>(
        this.apiUrl + 'delete-member.php',
        {
          MemberID: memberID,
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
  updateMember(member: Member): Observable<MemberServiceApiResponse> {
    return this.httpClient
      .post<MemberServiceApiResponse>(
        this.apiUrl + 'update-member.php',
        member,
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
  memberByID(memberID: any): Observable<MemberDetailServiceApiResponse> {
    return this.httpClient
      .post<MemberDetailServiceApiResponse>(
        this.apiUrl + 'memberByID.php',
        {
          MemberID: memberID,
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
  memberByEmailAndPassword(
    member: MemberLogin
  ): Observable<MemberLoginDetailServiceApiResponse> {
    return this.httpClient
      .post<MemberLoginDetailServiceApiResponse>(
        this.apiUrl + 'memberByEmail.php',
        member,
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
  searchMember(Key: any): Observable<MemberServiceApiResponse> {
    return this.httpClient
      .post<MemberServiceApiResponse>(
        this.apiUrl + 'search-member.php',
        {
          searchKey: Key,
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
  memberByEmail(email: String): Observable<MemberDetailServiceApiResponse> {
    return this.httpClient
      .post<MemberDetailServiceApiResponse>(
        this.apiUrl + 'memberGoogleLogin.php',
        { Email: email },
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
  forgetPassByEmail(Email: any): Observable<MemberDetailServiceApiResponse> {
    return this.httpClient
      .post<MemberDetailServiceApiResponse>(
        this.apiUrl + 'forgetPassByEmail.php',
        {
          email: Email,
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
  forgetPassByUsername(
    Username: any
  ): Observable<MemberDetailServiceApiResponse> {
    return this.httpClient
      .post<MemberDetailServiceApiResponse>(
        this.apiUrl + 'forgetPassByUsername.php',
        {
          username: Username,
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
  addForgetPass(
    id: number,
    userName: string,
    eMail: string
  ): Observable<MemberForgetPassServiceApiResponse> {
    return this.httpClient
      .post<MemberForgetPassServiceApiResponse>(
        this.apiUrl + 'create-forget-pass.php',
        {
          memberID: id,
          email: eMail,
          username: userName,
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
  memberForgetPassByID(
    id: any
  ): Observable<MemberForgetPassDetailServiceApiResponse> {
    return this.httpClient
      .post<MemberForgetPassDetailServiceApiResponse>(
        this.apiUrl + 'member-forgetPass.php',
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
  resetPassword(
    id: any,
    password: any
  ): Observable<MemberForgetPassDetailServiceApiResponse> {
    return this.httpClient
      .post<MemberForgetPassDetailServiceApiResponse>(
        this.apiUrl + 'resetPassword.php',
        {
          MemberID: id,
          Password: password,
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
  deleteForgetPass(id: number): Observable<MemberForgetPassServiceApiResponse> {
    return this.httpClient
      .post<MemberForgetPassServiceApiResponse>(
        this.apiUrl + 'delete-forgetPass.php',
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
