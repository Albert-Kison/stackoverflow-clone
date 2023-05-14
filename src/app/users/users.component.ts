import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users?: any[];
  selectedUser?: any;

  constructor(public authService: AuthService, private router: Router, public usersService: UsersService, public modalService: ModalServiceService){}

  ngOnInit(): void {
    if (!this.authService.isAdmin()) {
      this.router.navigate(["/"]);
    } else {
      this.usersService.getUsers().subscribe({
        next: (res) => {
          // this.loading = false;
          console.log(res);
          
          this.users = res;
        },
        error: err => console.log(err),
      });
    }
  }

  editButtonClicked(user: any) {
    this.selectedUser = user;
    this.modalService.open();
  }

  deleteButtonClicked(user: any) {
    this.usersService.deleteUser(user._id).subscribe({
      next: (res) => {

      },
      error: err => console.log(err),
    });
  }

}
