import { Component, Input } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { AuthService } from '../auth.service';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent {
  @Input() question?: any;
  openEditAnswer = false;
  selectedAnswer?: any;

  constructor(public questionsService: QuestionsService, public authService: AuthService, public modalService: ModalServiceService){}

  approveAnswer(id: number) {
    this.questionsService.approveAnswer(id, this.question._id).subscribe({
      next: () => {
        
      },
      error: err => console.log(err),
    });
  }

  editButtonClicked(answer: any) {
    this.modalService.openEditAnswer = true;
    this.selectedAnswer = answer;
    this.modalService.open();
  }

  deleteButtonClicked(answer: any) {
    this.questionsService.deleteAnswer(this.question._id, answer._id).subscribe({
      next: () => {
        
      },
      error: err => console.log(err),
    });
    
  }

  upvoteButtonClicked(answer: any) {
    this.questionsService.upvoteAnswer(answer._id, this.question._id).subscribe({
      next: () => {
        
      },
      error: err => console.log(err),
    });
  }
}
