import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Collapse } from "flowbite";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  isCollapsed: boolean = true;
  constructor(public auth: AuthService) {}
}
