import { Component } from '@angular/core';
import { Course } from '../../../../shared/entities';
import { Router } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-view-course',
  imports: [MatCardModule],
  templateUrl: './view-course.html',
  styleUrl: './view-course.css'
})
export class ViewCourse {

  course!: Course;

  constructor(private router:Router) {
    const navigation = this.router.getCurrentNavigation();
    this.course = navigation?.extras.state?.["course"];
  }
}
