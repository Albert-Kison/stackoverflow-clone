import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  registerUserData = {
    name: "",
    email: "",
    password: ""
  };

  constructor(private auth: AuthService, private router: Router){}

  registerUser() {
    console.log(this.registerUserData);
    this.auth.addUser(this.registerUserData).subscribe({
      next: res => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/"]);
      },
      error: err => console.log(err),
    });
  }
}
