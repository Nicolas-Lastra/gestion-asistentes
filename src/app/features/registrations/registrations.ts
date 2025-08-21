import { NgIf } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { CreateStudentForm } from './create-student-form/create-student-form';
import { CreateCourseForm } from './create-course-form/create-course-form';

@Component({
  selector: 'app-registrations',
  imports: [NgIf, MatTabsModule, MatButtonToggleModule, CreateStudentForm, CreateCourseForm],
  templateUrl: './registrations.html',
  styleUrl: './registrations.css'
})
export class Registrations {

  view = signal<'student' | 'course'>('student');

  onTabChange(idx: number) {
    this.view.set(idx === 0 ? 'student' : 'course');
  }
}
