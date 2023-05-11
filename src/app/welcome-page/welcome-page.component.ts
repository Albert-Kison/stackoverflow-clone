import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.css']
})
export class WelcomePageComponent {
  constructor(private router: Router, private questionService: QuestionsService) {}

  searchValue = "";

  goToQuestions() {
    this.router.navigate(["/allQuestions"]);
  }

  onSubmit() {
    console.log(this.searchValue);
    this.questionService.searchByText(this.searchValue).subscribe({
      next: res => {
        console.log(res);
        this.questionService.setSearchResults(res);
        this.router.navigate([`/${encodeURIComponent(this.searchValue)}`]);
      },
      error: err => console.log(err),
    });
  }
}
