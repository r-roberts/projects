import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHandler, HttpHeaders } from '@angular/common/http';
import { throwError, BehaviorSubject, Observable, Subscribable } from 'rxjs';
import { map, catchError, filter, tap } from 'rxjs/operators';
import { LoginPage } from './login/login.page';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  curUser: string;
  private loginURLBase = 'https://cors-anywhere.herokuapp.com/https://api.myfantasyleague.com/2019/login?';
   xml = '1';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };

constructor(private http: HttpClient) { }


getLoginInformation() { }

login(username: string, password: string): Observable < User > {
  const loginURL = this.loginURLBase + `USERNAME=${username}&PASSWORD=${password}&XML=1`;
  // const body = {'USERNAME' : username, 'PASSWORD': password, 'XML' : this.xml};
  return this.http.post(loginURL, {} , this.httpOptions).pipe(
    tap((data) => console.log(`post successful: ${data}`)),
    catchError(error => error)
    ));
  console.log("post done");
}

logout() { }

isLoggedIn() { }

isCommisioner() { }

getAuthToken() { }
}
