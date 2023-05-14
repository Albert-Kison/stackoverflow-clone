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
  showError = false;

  constructor(private auth: AuthService, private router: Router){}

  registerUser() {
    console.log(this.registerUserData);
    this.auth.addUser(this.registerUserData).subscribe({
      next: res => {
        this.showError = false;
        console.log(res);
        this.router.navigate(["/login"]);
      },
      error: err => this.showError = true,
    });
  }
}
