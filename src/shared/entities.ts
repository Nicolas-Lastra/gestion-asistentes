export interface Student {
  id: string;
  name: string;
  surname: string;
  dni: string;
  email: string;
}

export type StudentCreate = Omit<Student, 'id'>;

export interface Course {
  name: string;
  code: string;
  credits: number;
  id: string;
}

export type CourseCreate = Omit<Course, 'id'>;

export interface User {
  name: string;
  password: string;
  role: 'user' | 'admin';
}

export interface Credentials {
  name: string;
  password: string;
}