import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentsAPI } from '../../students/students-api';
import { Router } from '@angular/router';
import { StudentCreate } from '../../../../shared/entities';
import { RoutePaths } from '../../../../shared/routes';

@Component({
  selector: 'app-create-student-form',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './create-student-form.html',
  styleUrl: './create-student-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateStudentForm {

  private fb = inject(NonNullableFormBuilder);
  private api = inject(StudentsAPI);
  private snack = inject(MatSnackBar);
  private router = inject(Router);

  form = this.fb.group({
    name: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(3)] }),
    surname: this.fb.control<string>('', { validators: [Validators.required, Validators.minLength(3)] }),
    dni: this.fb.control<string>('', { validators: [Validators.required, Validators.min(0)] }),
    email: this.fb.control<string>('', { validators: [Validators.required, Validators.email] }),
  });

  submitting = false;

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;

    const payload: StudentCreate = this.form.getRawValue();

    this.api.createStudent(payload)
      .subscribe({
        next: () => {
          this.snack.open('Student created', 'OK', { duration: 2500 });
          this.form.reset();
          this.submitting = false;
          this.router.navigate([RoutePaths.STUDENTS]);
        },
        error: () => {
          this.snack.open('Error creating student', 'Close', { duration: 3000 });
          this.submitting = false;
        }
      });
  }
}
