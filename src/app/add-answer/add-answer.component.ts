import { Component, Input, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { ModalServiceService } from '../modal-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  @Input() originalAnswer?: any;
  @Input() questionId?: any;
  question?: any;

  answer: any = {
    text: ""
  }
  img?: File;
  selectedImage: File | null = null;
  imageUrl: string | null = null;
  showError = false;

  constructor(private questionService: QuestionsService, public authService: AuthService, public modalService: ModalServiceService, private router: Router){}

  ngOnInit(): void {
    if (this.originalAnswer) {
      this.answer = {
        text: this.originalAnswer.text
      }
    }
  }

  onFileSelected(event: any): void {
    const target = event.target as HTMLInputElement;
    const file = (target.files as FileList)[0];
    this.selectedImage = file;

    // Generate image URL for preview (optional)
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      this.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    this.answer.questionId = this.questionId;
    
    console.log(1232342);
    if (this.imageUrl) {
      this.answer.link = this.imageUrl;
    }

    if (this.answer.text !== "") {
      if (this.originalAnswer) {
        console.log(this.answer);
        
        console.log("edit");
        
        this.questionService.editAnswer(this.answer, this.originalAnswer._id).subscribe({
          next: res => {
            this.showError = false;            
            this.modalService.close();
            console.log(res);
          },
          error: err => {
            this.showError = true;
            console.log(err);          
              
            if (err.status === 401) {
              this.router.navigate(["/login"]);
            }
          }
        });
      } else {
        console.log("Submit");
        console.log(this.answer);
        
        this.questionService.addAnswer(this.answer).subscribe({
          next: res => {
            this.showError = false;
            this.modalService.close();
            console.log(res);
          },
          error: err => {
            this.showError = true;
            console.log(err);          
              
            if (err.status === 401) {
              this.router.navigate(["/login"]);
            }
          }
        });
      }
    }
  }
}
