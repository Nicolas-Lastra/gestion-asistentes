import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../shared/entities';

@Component({
  selector: 'app-modify-form',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './modify-form.html',
  styleUrl: './modify-form.css'
})
export class ModifyForm implements OnInit {

  modifyForm!: FormGroup;
  @Output() studentModified = new EventEmitter<Student>();
  res: any = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.modifyForm = this.fb.group({
      id: ['', [Validators.required, Validators.min(0)]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.modifyForm.valid) {
      this.res = this.modifyForm.value;
      this.studentModified.emit(this.res);
      this.modifyForm.reset();
    } else {
      this.res = null;
      this.modifyForm.markAllAsTouched();
    }
  }

  onReset() {
    this.modifyForm.reset();
  }
}
