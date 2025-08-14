import { Component } from '@angular/core';
import { StudentsAPI } from './students-api';
import { Student } from '../../../shared/entities';
import { CommonModule } from '@angular/common';
import { StudentsTable } from "./students-table/students-table";
import { Observable, switchMap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth-service';

@Component({
  selector: 'app-students',
  imports: [CommonModule, StudentsTable, MatProgressSpinnerModule],
  templateUrl: './students.html',
  styleUrl: './students.css'
})
export class Students {

  isAdmin$!: Observable<boolean>;

  students!: Student[];
  constructor(private studentsApi: StudentsAPI, private _snackBar: MatSnackBar, private router: Router, private auth: AuthService) {
    this.isAdmin$ = this.auth.isAdmin$;
  }

  ngOnInit() {
    this.studentsApi.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  deleteStudent(student: Student) {

    this.studentsApi.deleteStudent(student).pipe(
      switchMap(() => this.studentsApi.getStudents())
    ).subscribe(students => {
      this.students = students;
    }
    );

    this._snackBar.open('Student deleted successfully', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });
  }

}
