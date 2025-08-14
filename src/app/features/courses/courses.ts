import { Component } from '@angular/core';
import { Course } from '../../../shared/entities';
import { CoursesApi } from './courses-api';
import { JsonPipe, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CoursesTable } from './courses-table/courses-table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth-service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, CoursesTable, MatProgressSpinnerModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {

  isAdmin$!: Observable<boolean>;

  courses!: Course[];
  constructor(private coursesApi: CoursesApi, private _snackBar: MatSnackBar, private auth: AuthService) {
    this.isAdmin$ = this.auth.isAdmin$;
  }

  ngOnInit() {
    this.coursesApi.getCourses().subscribe(courses => {
      this.courses = courses;
    });
  }

  deleteCourse(course: Course) {

    this.coursesApi.deleteCourse(course).subscribe(() => {
      this.coursesApi.getCourses().subscribe(courses => {
        this.courses = courses;
      })
    });

    this.coursesApi.deleteCourse(course).pipe(
      switchMap(() => this.coursesApi.getCourses())
    ).subscribe(courses => {
      this.courses = courses;
    }
    );

    this._snackBar.open('Course deleted successfully', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }
}
