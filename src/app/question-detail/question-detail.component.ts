import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';
import { AuthService } from '../auth.service';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  openAddAnswerModal = false;
  openEditQuestionModal = false;
  
  constructor(public questionsService: QuestionsService, private route: ActivatedRoute, public authService: AuthService, public modalService: ModalServiceService){}
  id = "";
  question?: any

  ngOnInit(): void {
    // console.log("peorkfp");    
    console.log(this.route.snapshot.paramMap.get("id"));
    
    this.id = this.route.snapshot.paramMap.get("id") as string;
    this.questionsService.getQuestion(this.id).subscribe({
      next: res => {
        console.log(res);
        this.question = res;
      },
      error: err => console.log(err),
    });
  }

  isEmpty(): boolean {
    return Object.keys(this.questionsService.question).length === 0;
  }

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

  addAnswerClicked() {
    this.modalService.openAddAnswer = true;
    this.modalService.open();
  }

  approveAnswer(answerId: any) {
    this.questionsService.approveAnswer(answerId, this.question._id).subscribe({
      next: () => {
        
      },
      error: err => console.log(err),
    });
  }

  editButtonClicked(question: any) {
    this.modalService.openEditQuestion = true;
    this.modalService.open();
  }

  deleteButtonClicked(question: any) {
    this.questionsService.deleteQuestion(question._id).subscribe({
      next: (res) => {

      },
      error: err => console.log(err),
    });
  }
}
