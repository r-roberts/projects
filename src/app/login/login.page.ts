import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userName: string;
  password: string;


  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  attemptLogin(): User {
   return  this.authService.login(this.userName, this.password);
  }

}
