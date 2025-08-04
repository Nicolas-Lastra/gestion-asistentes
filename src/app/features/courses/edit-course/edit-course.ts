import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../shared/entities';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CoursesApi } from '../courses-api';

@Component({
  selector: 'app-edit-course',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './edit-course.html',
  styleUrl: './edit-course.css'
})
export class EditCourse implements OnInit {

  editForm!: FormGroup;
  course!: Course;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private coursesApi: CoursesApi,
    private _snackbar: MatSnackBar
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.course = navigation?.extras.state?.["course"];

    if (!this.course) {
      this.router.navigate(['/courses']);
    }
  }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: [this.course.name, [Validators.required, Validators.minLength(3)]],
      code: [this.course.code, [Validators.required, Validators.minLength(3)]],
      credits: [this.course.credits, [Validators.required, Validators.min(0)]]
    });
  }

  onReset() {
    this.editForm.reset({
      name: this.course.name,
      code: this.course.code,
      credits: this.course.credits
    });
  }

  onSubmit() {
    if (this.editForm.valid) {
      const updatedCourse: Course = {
        ...this.course,
        ...this.editForm.value
      };

      this.coursesApi.editCourse(updatedCourse).subscribe({
        next: (res) => {
          this._snackbar.open('Course updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar']
          });
          this.router.navigate(['/courses']);
        },
        error: (err) => {
          this._snackbar.open('Failed to update course', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar']
          });
          console.error('Error updating course:', err);
        }
      });
    } else {
      this.editForm.markAllAsTouched();
    }
  }
}
