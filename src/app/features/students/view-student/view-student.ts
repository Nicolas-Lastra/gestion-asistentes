import { Component } from '@angular/core';
import { Student } from '../../../../shared/entities';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { FullnamePipe } from "../../../../shared/pipes/fullname-pipe";

@Component({
  selector: 'app-view-student',
  imports: [MatCardModule, FullnamePipe],
  templateUrl: './view-student.html',
  styleUrl: './view-student.css'
})
export class ViewStudent {

  student!: Student ;

  constructor(private router:Router) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras.state?.["student"];
  }
}
