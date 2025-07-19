import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-form',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './delete-form.html',
  styleUrl: './delete-form.css'
})
export class DeleteForm implements OnInit{

  deleteForm!: FormGroup;
  @Output() studentDeleted = new EventEmitter<string>();
  dniRes: any = null;
  
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.deleteForm = this.fb.group({
        dni: ['', [Validators.required, Validators.min(0)]],
      });
  }

  onDelete() {
    if (this.deleteForm.valid) {
      this.dniRes = this.deleteForm.value;
      this.studentDeleted.emit(this.dniRes.dni.toString());
      this.deleteForm.reset();
    } else {
      this.dniRes = null;
      this.deleteForm.markAllAsTouched();
    }
  }
}
