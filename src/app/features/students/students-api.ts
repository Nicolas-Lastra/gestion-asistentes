import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Student } from '../../../shared/entities';
import { HttpClient } from '@angular/common/http';
import { RoutePaths } from '../../../shared/routes';

@Injectable({
  providedIn: 'root'
})

export class StudentsAPI {
  baseUrl = RoutePaths.DATABASE;

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.baseUrl}/${RoutePaths.STUDENTS}`).pipe(delay(1000));
  }

  deleteStudent(student: Student): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${RoutePaths.STUDENTS}/${student.id}`).pipe(delay(1000));
  }

  editStudent(student: Student): Observable<Student> {
    return this.http.put<Student>(`${this.baseUrl}/${RoutePaths.STUDENTS}/${student.id}`, student).pipe(delay(1000));
  }
}
