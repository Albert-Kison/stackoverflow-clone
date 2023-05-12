import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  searchQuery = "";
  questions: any[] = [];

  constructor(private questionService: QuestionsService, private route: ActivatedRoute, private router: Router, private location: Location, public modalService: ModalServiceService){}

  ngOnInit(): void {
    console.log("kjerhf");
    
    this.searchQuery = decodeURIComponent(this.route.snapshot.paramMap.get("text") as string);
    console.log(this.searchQuery);
    

    // this.searchQuery = this.searchQuery === "allQuestions" ? "" : this.searchQuery;
    console.log(!!this.searchQuery);
    
    if (this.searchQuery !== "null") {
      console.log(2);
      this.search(this.searchQuery)
    } else {
      this.searchQuery = "";
      console.log(1);      
      this.getAllQuestions();
    }
  }

  getAllQuestions() {
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

  search(text: string) {
    if (text === "") {
      this.router.navigate([`/questions`]);
      this.getAllQuestions();
    } else {
      this.router.navigate([`/questions/${encodeURIComponent(text)}`]);
      this.questionService.searchByText(text).subscribe({
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

  addQuestionClicked() {
    if (!localStorage.getItem("token")) {
      this.router.navigate(["/login"])
    } else {
      this.modalService.open();
    }
  }
}
