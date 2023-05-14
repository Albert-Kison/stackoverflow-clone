import { Component } from '@angular/core';
import { ModalServiceService } from '../modal-service.service';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent {
    constructor(public modalService: ModalServiceService){}
}
