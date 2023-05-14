import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  isVisible$ = new BehaviorSubject<boolean>(false);
  openAddAnswer = false;
  openEditQuestion = false;
  openEditAnswer = false;

  constructor() { }

  open() {
    this.isVisible$.next(true);
  }

  close() {
    this.openAddAnswer = false;
    this.openEditQuestion = false;
    this.openEditAnswer = false;
    this.isVisible$.next(false);
  }
}
