import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable, Subscribable, bindNodeCallback } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { LoginPage } from './login/login.page';
import { User } from './user';
import { parseString } from 'xml2js';
import { runInThisContext } from 'vm';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  curUser: User;
  private loginURLBase = 'https://cors-anywhere.herokuapp.com/https://api.myfantasyleague.com/2019/login?';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/xml',
      Accept: 'text/xml' }),
    responseType: 'text' as 'json'
  };

constructor(private http: HttpClient) { }


getLoginInformation() { }

login(username: string, password: string): Observable < any >  {
  const loginURL = this.loginURLBase + `USERNAME=${username}&PASSWORD=${password}&XML=1`;
  return this.http.post<any>(loginURL, {} , this.httpOptions )
            .pipe(switchMap(res =>
              bindNodeCallback(parseString)(res))
            );
}

// should go in AppComponent
logout() { }

isLoggedIn() { }

isCommisioner() { }

getAuthToken() { }
}
