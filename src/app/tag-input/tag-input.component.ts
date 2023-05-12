import { Component } from '@angular/core';
import { TAGS } from '../tags';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css']
})
export class TagInputComponent {
  tags = TAGS;
  tagInput = "";
  suggested_tags: string[] = [];
  selectedTags: string[] = []

  constructor(public tagService: TagService){}

  onInputChange() {
    console.log(this.tagInput);
    if (this.tagInput === "") {
      this.suggested_tags = TAGS;
    } else {
      this.suggested_tags = TAGS.filter(tag => tag.toLowerCase().includes(this.tagInput.toLocaleLowerCase()));
    }
    console.log(this.suggested_tags);
    
  }

  onTagClick(tag: string) {
    this.tagInput = "";
    this.suggested_tags = [];
    if (!this.selectedTags.includes(tag)) {
      this.tagService.addTag(tag);
    }
  }

  deleteTag(tag: string) {
    this.tagService.deleteTag(tag);
  }
}
