import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  
  constructor(private questionsService: QuestionsService, private route: ActivatedRoute){}
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
}
