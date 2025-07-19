import { Component, EventEmitter, Output } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  imports: [NgbNavModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  active = 'studentsList';

  @Output() activeSection = new EventEmitter<string>();

  navigate(section: string) {
    this.activeSection.emit(section);
  }
}
