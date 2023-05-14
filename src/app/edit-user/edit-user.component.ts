import { Component, Input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() user?: any;
  userToEdit?: any;
  showError = false;

  constructor(private usersService: UsersService, private modalService: ModalServiceService){}

  ngOnInit(): void {
    this.userToEdit = {
      name: this.user.name,
      email: this.user.email,
      tags: this.user.tags,
      password: ""
    }
  }

  deleteTag(tag: string) {
    this.userToEdit.tags = this.userToEdit.tags.filter((t: any) => t !== tag);
  }

  onSubmit() {
    if (this.userToEdit.name === "" || this.user.email === "" || this.user.password === "")  {
      this.showError = true;
    } else {
      console.log(this.userToEdit);
      
      this.usersService.editUser(this.userToEdit, this.user._id).subscribe({
        next: res => {
          this.showError = false;
          this.modalService.close();
          console.log(res);
        },
        error: err => this.showError = true
      });
    }
  }
}
