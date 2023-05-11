import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginUserData = {
    email: "",
    password: ""
  };

  constructor(private auth: AuthService, private router: Router){}

  loginUser() {
    console.log(this.loginUserData);
    this.auth.loginUser(this.loginUserData).subscribe({
      next: res => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/"]);
      },
      error: err => console.log(err),
    });
  }
}
