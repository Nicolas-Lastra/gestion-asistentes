import { Component, OnInit, signal } from '@angular/core';
import { Student } from '../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { StudentsTable } from '../students-table/students-table';
import { AddForm } from "../add-form/add-form";
import { DeleteForm } from '../delete-form/delete-form';
import { ModifyForm } from '../modify-form/modify-form';
import { Navbar } from '../navbar/navbar';

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
  constructor(private http: HttpClient) { }

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
    console.log('Student added successfully')
  }

  deleteStudent(dni: string) {

    const foundStudent = this.students.find(listStudent => listStudent.dni === dni);
    if (foundStudent) {
      const studentsList = this.students.filter(student => student.dni.toString() != dni);
      this.students = [...studentsList];
    } else {
      console.log(`Student with DNI: ${dni} not found`)
    }

  }

  modifyStudent(student: Student) {
    const foundStudent = this.students.find(listStudent => listStudent.id === student.id);
    if (foundStudent) {
      foundStudent.name = student.name;
      foundStudent.surname = student.surname;
      foundStudent.dni = student.dni;
      foundStudent.email = student.email;
    } else {
      console.log(`Student with ID: ${student.id} not found`)
    }
  }
}
