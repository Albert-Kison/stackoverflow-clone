import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-fill',
  templateUrl: './button-fill.component.html',
  styleUrls: ['./button-fill.component.css']
})
export class ButtonFillComponent {
  @Input() text?: String
}
