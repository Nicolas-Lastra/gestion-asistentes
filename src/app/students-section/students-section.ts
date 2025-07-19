import { Component, OnInit } from '@angular/core';
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../students-table/students-table';
import { AddForm } from "../add-form/add-form";
import { DeleteForm } from '../delete-form/delete-form';
import { ModifyForm } from '../modify-form/modify-form';
import { Navbar } from '../navbar/navbar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-students-section',
  imports: [CommonModule, StudentsTable, AddForm, DeleteForm, ModifyForm, Navbar],
  templateUrl: './students-section.html',
  styleUrl: './students-section.css'
})
export class StudentsSection implements OnInit {

  // ID initialization

  private lastId = 0;

  // Loading students list from json file

  students: Student[] = [];
  activeSection = "studentsList";
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.http.get<Student[]>('/mocks/students.json').subscribe(data => {
      this.students = data;

      const ids = this.students.map(s => s.id);
      this.lastId = ids.length ? Math.max(...ids) : 0;
    })
  }

  // Students list modification

  addStudent(student: Student) {

    this.lastId++;
    const newStudent: Student = { ...student, id: this.lastId };
    this.students = [...this.students, newStudent];
    this._snackBar.open('Student added successfully', 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar']
    });

  }

  deleteStudent(dni: string) {

    const foundStudent = this.students.find(listStudent => listStudent.dni.toString() === dni);

    if (foundStudent) {
      const studentsList = this.students.filter(student => student.dni.toString() !== dni);
      this.students = [...studentsList];

      this._snackBar.open('Student deleted successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

    } else {
      this._snackBar.open(`Student with DNI: ${dni} not found`, 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }

  }

  modifyStudent(student: Student) {
    const foundStudent = this.students.find(listStudent => listStudent.id === student.id);
    if (foundStudent) {
      foundStudent.name = student.name;
      foundStudent.surname = student.surname;
      foundStudent.dni = student.dni;
      foundStudent.email = student.email;

      this._snackBar.open('Student modified successfully', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

    } else {
      console.log(`Student with ID: ${student.id} not found`);

      this._snackBar.open(`Student with DNI: ${student.id} not found`, 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
