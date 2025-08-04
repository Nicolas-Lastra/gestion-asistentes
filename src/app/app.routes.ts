import { Routes } from '@angular/router';
import { Home } from './home/home';
import { RoutePaths } from '../shared/routes';
import { ViewStudent } from './features/students/view-student/view-student';
import { ViewCourse } from './features/courses/view-course/view-course';
import { EditStudent } from './features/students/edit-student/edit-student';
import { EditCourse } from './features/courses/edit-course/edit-course';
import { NotFoundComponent } from './not-found-component/not-found-component';

export const routes: Routes = [
    {
        path:'',
        component: Home
    },
    {
        path: RoutePaths.HOME,
        component: Home
    },
    {
        path: RoutePaths.STUDENTS,
        loadComponent: () => import('./features/students/students').then(m => m.Students)
    },
    {
        path: RoutePaths.COURSES,
        loadComponent: () => import('./features/courses/courses').then(m => m.Courses)
    },
    {
        path: RoutePaths.REGISTRATIONS,
        loadComponent: () => import('./features/registrations/registrations').then(m => m.Registrations)
    },
    {
        path: RoutePaths.VIEWSTUDENT,
        component: ViewStudent
    },
    {
        path: RoutePaths.EDITSTUDENT,
        component: EditStudent
    },
    {
        path: RoutePaths.VIEWCOURSE,
        component: ViewCourse
    },
    {
        path: RoutePaths.EDITCOURSE,
        component: EditCourse
    },
    {
        path: RoutePaths.DATABASE,
        redirectTo: 'http://localhost:3000'
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];
