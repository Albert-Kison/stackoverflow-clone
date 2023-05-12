import { Component } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { TAGS } from '../tags';

@Component({
  selector: 'app-become-a-pro',
  templateUrl: './become-a-pro.component.html',
  styleUrls: ['./become-a-pro.component.css']
})
export class BecomeAProComponent {
  tags = TAGS;
  tagInput = "";
  suggested_tags: string[] = [];

  registerUserData: any = {
    name: "",
    email: "",
    password: "",
    tags: []
  };

  constructor(private auth: AuthService, private router: Router){}

  onInputChange() {
    console.log(this.tagInput);
    if (this.tagInput === "") {
      this.suggested_tags = TAGS;
    } else {
      this.suggested_tags = TAGS.filter(tag => tag.toLowerCase().includes(this.tagInput.toLocaleLowerCase()));
    }
    console.log(this.suggested_tags);
    
  }

  onTagClick(tag: string) {
    this.tagInput = "";
    this.suggested_tags = [];
    if (!this.registerUserData.tags.includes(tag)) {
      this.registerUserData.tags.push(tag);
    }
  }

  deleteTag(tag: string) {
    this.registerUserData.tags = this.registerUserData.tags.filter((t: any) => t !== tag);
  }

  registerUser() {
    console.log(this.registerUserData);
    this.auth.addExpert(this.registerUserData).subscribe({
      next: res => {
        console.log(res);
        localStorage.setItem("token", res.token);
        this.router.navigate(["/"]);
      },
      error: err => console.log(err),
    });
  }
}
