import { Component } from '@angular/core';
import { StudentsAPI } from './students-api';
import { Student } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from "./students-table/students-table";
import { Observable, switchMap, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../../shared/services/auth-service';

@Component({
  selector: 'app-students',
  imports: [CommonModule, StudentsTable, MatProgressSpinnerModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {

  isAdmin$!: Observable<boolean>;
  students$!: Observable<Student[]>;

  constructor(private studentsApi: StudentsAPI, private _snackBar: MatSnackBar, private auth: AuthService) {
    this.isAdmin$ = this.auth.isAdmin$;
    this.students$ = this.studentsApi.getStudents();
  }

  deleteStudent(student: Student) {

    this.students$ = this.studentsApi.deleteStudent(student).pipe(
      tap(() => {
        this._snackBar.open('Course deleted successfully', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar']
        });
      }),
      switchMap(() => this.studentsApi.getStudents())
    );
  }

}
