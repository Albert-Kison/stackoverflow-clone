import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  tags$ = new BehaviorSubject<string[]>([]);
  tags: string[] = [];

  addTag(tag: string) {
    this.tags.push(tag);
    this.tags$.next(this.tags);
  }

  deleteTag(tag: string) {
    this.tags = this.tags.filter((t: any) => t !== tag);
    this.tags$.next(this.tags);
  }
}
