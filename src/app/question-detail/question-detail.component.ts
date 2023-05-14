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
