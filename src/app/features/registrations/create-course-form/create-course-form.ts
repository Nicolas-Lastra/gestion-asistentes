import { Component, inject } from '@angular/core';
import { CoursesApi } from '../../courses/courses-api';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CourseCreate } from '../../../../shared/entities';
import { RoutePaths } from '../../../../shared/routes';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-course-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './create-course-form.html',
  styleUrl: './create-course-form.css'
})
export class CreateCourseForm {

  private fb = inject(NonNullableFormBuilder);
  private api = inject(CoursesApi);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  form = this.fb.group({
    name: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(3)] }),
    code: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(3)] }),
    credits: this.fb.control<number>(0, { validators: [Validators.required, Validators.min(0)] })
  });

  submitting = false;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const payload: CourseCreate = this.form.getRawValue();

    this.api.createCourse(payload)
      .subscribe({
        next: () => {
          this.snack.open('Course created', 'OK', { duration: 2500 });
          this.form.reset();
          this.submitting = false;
          this.router.navigate([RoutePaths.COURSES]);
        },
        error: () => {
          this.snack.open('Error creating course', 'Close', { duration: 3000 });
          this.submitting = false;
        }
      });
  }
}
