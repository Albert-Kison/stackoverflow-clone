import { Component, Input, OnInit } from '@angular/core';
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
  @Input() originalQuestion?: any;

  question: any = {
    questionName: "",
    text: "",
    tags: [],
  }
  img?: File;
  selectedImage: File | null = null;
  imageUrl: string | null = null;
  showError = false;

  constructor(public modalService: ModalServiceService, public tagService: TagService, private questionService: QuestionsService, private router: Router){
    
  }

  ngOnInit(): void {
    if (this.originalQuestion) {
      this.question = {
        questionName: this.originalQuestion.questionName,
        text: this.originalQuestion.text,
        tags: this.originalQuestion.tags
      }
    }
    
    this.tagService.tags$.subscribe({
      next: res => {
        this.question.tags = res;
      },
      error: err => console.log(err),
    });
  }

  deleteTag(tag: string) {
    this.question.tags = this.question.tags.filter((t: any) => t !== tag);
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
    console.log(1232342);
    if (this.imageUrl) {
      this.question.link = this.imageUrl;
    };
    

    if (this.question.questionName === "" || this.question.text === "" || this.question.tags.length === 0) {
      this.showError = true;
    } else {
      console.log("Submiteurhfiuerhgiuh");          
      console.log(this.question);

//       const formData = new FormData();
//       if (this.img) {
//         formData.append('image', this.img, this.img.name);
//       }
//       formData.append("questionName", this.question.questionName);
//       formData.append("text", this.question.text);
//       formData.append('tags', JSON.stringify(this.question.tags));

//       console.log("FormData content:");
// formData.forEach((value, key) => {
//   console.log(key, value);
// });
      
      if (this.originalQuestion) {
        console.log("edit");

        this.questionService.editQuestion(this.question, this.originalQuestion._id).subscribe({
          next: res => {
            console.log(res);
            this.modalService.close()
          },
          error: err => console.log(err),
        });
        
      } else {
        console.log("submit");
        
        this.questionService.addQuestion(this.question).subscribe({
          next: res => {
            this.showError = false
            this.modalService.close();
            console.log(res);
          },
          error: err => {
            this.showError = true
            this.modalService.close();
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

