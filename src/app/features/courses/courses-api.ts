import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Course } from '../../../shared/entities';

@Injectable({
  providedIn: 'root'
})
export class CoursesApi {

  baseUrl = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/courses`).pipe(delay(1000));
  }

  deleteCourse(course: Course): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${course.id}`).pipe(delay(1000));
  }

  editCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/courses/${course.id}`, course).pipe(delay(1000));
  }
}
