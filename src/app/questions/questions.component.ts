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
  filters: any = {
    notAnswered: false
  }
  loading = true;
  currentPage = 1;
  filteredQuestions: any[] = [];
  // questions: any[] = [];

  constructor(public questionService: QuestionsService, private route: ActivatedRoute, private router: Router, private location: Location, public modalService: ModalServiceService){}

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
      next: (res) => {
        this.loading = false;
        this.filteredQuestions = res;
      },
      error: err => console.log(err),
    });
  }

  search(text: string) {
    console.log(text);
    
    if (text === "") {
      this.router.navigate([`/questions`]);
      this.getAllQuestions();
    } else {
      this.router.navigate([`/questions/${encodeURIComponent(text)}`]);
      this.questionService.searchByText(text).subscribe({
        next: (res) => {
          this.loading = false;
          this.filteredQuestions = res;

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

  onFiltersChanged(selectedFilters: any) {
    this.filters = selectedFilters;
    
    this.filteredQuestions = this.questionService.questions.filter(question => {
      if (this.filters.notAnswered) {
        return !question.answered;
      }
      return true; // return all questions if notAnswered filter is not selected
    });
  }

  changePage(page: number): void {
    this.currentPage = page;
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
  
}
