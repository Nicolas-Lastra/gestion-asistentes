import { Component, OnInit} from '@angular/core';
import { Student } from '../../../../shared/entities';
import { Router } from '@angular/router';
import { CommonModule} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { StudentsAPI } from '../students-api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoutePaths } from '../../../../shared/routes';

@Component({
  selector: 'app-edit-student',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './edit-student.html',
  styleUrl: './edit-student.css'
})
export class EditStudent implements OnInit {

  editForm!: FormGroup;
  student!: Student;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentsApi: StudentsAPI,
    private _snackbar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.student = navigation?.extras.state?.["student"];

    if (!this.student) {
      this.router.navigate([RoutePaths.STUDENTS]);
    }
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.student.name, [Validators.required, Validators.minLength(3)]],
      surname: [this.student.surname, [Validators.required, Validators.minLength(3)]],
      dni: [this.student.dni, [Validators.required, Validators.min(0)]],
      email: [this.student.email, [Validators.required, Validators.email]]
    });
  }

  onReset() {
    this.editForm.reset({
      name: this.student.name,
      surname: this.student.surname,
      dni: this.student.dni,
      email: this.student.email
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedStudent: Student = {
        ...this.student,
        ...this.editForm.value
      };
      
      this.studentsApi.editStudent(updatedStudent).subscribe({
        next: (res) => {
          this._snackbar.open('Student updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate([RoutePaths.STUDENTS]);
        },
        error: (err) => {
          this._snackbar.open('Failed to update student', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error updating student:', err);
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }

}
