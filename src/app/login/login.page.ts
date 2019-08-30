import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';
import { RouterModule, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { LoadingService } from '../loading.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private authService: AuthenticationService, private router: Router, private loadingService: LoadingService) { }
  userName: string;
  password: string;
  user: User;
  loginForm: FormGroup;
  invalidLogin = false;
  isLoading = false;

  validationMessages = {
    name: [
      { type: 'required', message: 'Username is required.' }
    ],
    pass: [
      { type: 'required', message: 'Password is required.' }
    ],
    badLogin: [
      { type: 'validLogin', message: 'Your username or password is not correct.' }
    ],
  };

  ngOnInit() {

    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required)
    });

  }

  onSubmit() {

    if (this.hasFormError()) {
      return;
    }
    this.loadingService.wrapLoading(this.authService.login(this.userName, this.password))
      .subscribe(
        data => {
          if (typeof data.error !== undefined) {
            console.log('invalid login');
            this.invalidLogin = true;
            return;
          }
          this.user = { ...data.status.$ };
          localStorage.setItem('curId', this.user.MFL_USER_ID);
        },
        () => {
          console.error('something went wrong...');
        },
        () => {
          if (typeof this.user.MFL_USER_ID !== undefined) {
            this.invalidLogin = false;
            this.router.navigateByUrl('/home');
          }
        });
  }

  attemptLogin() {
  }

  inputHasError(formControlName: string, validatorType: string) {
    if (this.loginForm.get(formControlName).hasError(validatorType) &&
      (this.loginForm.get(formControlName).dirty)) {
      return true;
    } else {
      return false;
    }
  }
  hasFormError = () => {
    let hasError = false;
    Object.keys(this.loginForm.controls).forEach(key => {
      hasError = this.loginForm.controls[key].status === 'INVALID';
    });
    return hasError;
  }

}
