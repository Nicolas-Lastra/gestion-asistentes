import { Component } from '@angular/core';
import { StudentsSection } from './students-section/students-section';
import { Toolbar } from './toolbar/toolbar';

@Component({
  selector: 'app-root',
  imports: [StudentsSection, Toolbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'gestion-asistentes';
}
