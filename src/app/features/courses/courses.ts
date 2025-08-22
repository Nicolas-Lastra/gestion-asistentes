import { Component } from '@angular/core';
import { Course } from '../../../shared/entities';
import { CoursesApi } from './courses-api';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { CoursesTable } from './courses-table/courses-table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, switchMap, tap } from 'rxjs';
import { AuthService } from '../../../shared/services/auth-service';

@Component({
  selector: 'app-courses',
  imports: [CommonModule, CoursesTable, MatProgressSpinnerModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css'
})
export class Courses {

  isAdmin$!: Observable<boolean>;
  courses$!: Observable<Course[]>;

  constructor(private coursesApi: CoursesApi, private _snackBar: MatSnackBar, private auth: AuthService) {
    this.isAdmin$ = this.auth.isAdmin$;
    this.courses$ = this.coursesApi.getCourses();
  }

  deleteCourse(course: Course) {

    this.courses$ = this.coursesApi.deleteCourse(course).pipe(
      tap(() => {
        this._snackBar.open('Course deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }),
      switchMap(() => this.coursesApi.getCourses())
    );

    // this._snackBar.open('Course deleted successfully', 'Close', {
    //   duration: 3000,
    //   panelClass: ['success-snackbar']
    // });
  }
}
