import { Component, OnInit } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';
import { TagService } from '../tag.service';
import { QuestionsService } from '../questions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-question-modal',
  templateUrl: './add-question-modal.component.html',
  styleUrls: ['./add-question-modal.component.css']
})
export class AddQuestionModalComponent implements OnInit {
  question: any = {
    questionName: "",
    text: "",
    tags: []
  }
  img?: File;

  constructor(public modalService: ModalServiceService, public tagService: TagService, private questionService: QuestionsService, private router: Router){}

  ngOnInit(): void {
    this.tagService.tags$.subscribe({
      next: res => {
        this.question.tags = res;
      },
      error: err => console.log(err),
    });
  }

  onFileSelected(event: any): void {
    this.img = event.target.files[0];
  }

  onSubmit() {
    console.log(1232342);

    if (this.question.questionName !== "" && this.question.text !== "" && this.question.tags.length > 0) {
      console.log("Submiteurhfiuerhgiuh");          
      console.log(this.question);

      const formData = new FormData();
      formData.append("image", this.img as File);
      formData.append("question", JSON.stringify(this.question));

      this.questionService.addQuestion(formData).subscribe({
        next: res => {
          console.log(res);
          this.modalService.close();
        },
        error: err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this.router.navigate(["/login"]);
            }
          }
        }
      });
    }
    
  }
}
