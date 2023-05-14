import { Component, EventEmitter, Output, Input } from '@angular/core';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  notAnswered = false;

  @Input() selectedFilters: any;
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter();

  // Method to handle filter changes
  onFilterChange() {
    console.log(this.notAnswered);
    
    const selectedFilters = {
      notAnswered: this.notAnswered
    }

    // Emit the selected filters
    this.filtersChanged.emit(selectedFilters);
  }
}
