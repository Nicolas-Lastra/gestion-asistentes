import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Student } from '../../shared/entities';

@Component({
  selector: 'app-add-form',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './add-form.html',
  styleUrl: './add-form.css'
})

export class AddForm implements OnInit {

  addForm!: FormGroup;
  // @Input() existingDnis: string[] = []; // For future development validate unique dnis
  @Output() studentAdded = new EventEmitter<Student>();
  res: any = null;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      dni: ['', [Validators.required, Validators.min(0)]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.addForm.valid) {
      this.res = this.addForm.value;
      this.studentAdded.emit(this.res);
      this.addForm.reset();
    } else {
      this.res = null;
      this.addForm.markAllAsTouched();
    }
  }

  onReset() {
    this.addForm.reset();
  }
}
