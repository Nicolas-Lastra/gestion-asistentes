import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { Course } from '../../../shared/entities';
import { RoutePaths } from '../../../shared/routes';

@Injectable({
  providedIn: 'root'
})
export class CoursesApi {

  baseUrl = RoutePaths.DATABASE;

  constructor(private http: HttpClient) { }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/${RoutePaths.COURSES}`).pipe(delay(1000));
  }

  deleteCourse(course: Course): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${RoutePaths.COURSES}/${course.id}`).pipe(delay(1000));
  }

  editCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${RoutePaths.COURSES}/${course.id}`, course).pipe(delay(1000));
  }

  createCourse(payload: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}${RoutePaths.COURSES}`, payload);
  }
}
