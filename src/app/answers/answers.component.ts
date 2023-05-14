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

  compare = (a: { upvotes: number }, b: { upvotes: number }) => {    
    if (a.upvotes < b.upvotes) {
      return 1; // Reverse the comparison order
    }
    if (a.upvotes > b.upvotes) {
      return -1; // Reverse the comparison order
    }
    return 0;
  };

  formatDate(dateString: string): string {
    const date = new Date(dateString);
  
    const day = date.getDate();
    const month = date.getMonth() + 1; // Month is zero-based
    const year = date.getFullYear();
  
    const formattedDate = `${this.padZero(day)}/${this.padZero(month)}/${year}`;
  
    return formattedDate;
  }

  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  upvoteButtonClicked(answer: any) {
    this.questionsService.upvoteAnswer(answer._id, this.question._id).subscribe({
      next: () => {
        
      },
      error: err => console.log(err),
    });
  }
}
