import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  searchQuery = "";
  questions: any[] = [];

  constructor(private questionService: QuestionsService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.searchQuery = decodeURIComponent(this.route.snapshot.paramMap.get("text") as string);

    this.questionService.getQuestions().subscribe({
      next: res => {
        console.log(res);
        if (res.length === 0) {
          console.log("No questions yet");          
        } else {
          this.questions = res;
        }
      },
      error: err => console.log(err),
    });
  }
}
