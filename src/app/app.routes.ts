import { Routes } from '@angular/router';
import { Home } from './home/home';
import { RoutePaths } from '../shared/routes';
import { Students } from './features/students/students';
import { ViewStudent } from './features/students/view-student/view-student';
import { ViewCourse } from './features/courses/view-course/view-course';
import { EditStudent } from './features/students/edit-student/edit-student';
import { EditCourse } from './features/courses/edit-course/edit-course';

export const routes: Routes = [
    
    {
        path: '',
        component: Students
    },
    {
        path: RoutePaths.STUDENTS,
        component: Students
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
        path: "view-student",
        component: ViewStudent
    },
    {
        path: "edit-student",
        component: EditStudent
    },
    {
        path: "view-course",
        component: ViewCourse
    },
    {
        path: "edit-course",
        component: EditCourse
    },
    // {
    //     path: RoutePaths.HOME,
    //     component: Home
    // },
    // {
    //     path: RoutePaths.USERS,
    //     component: User
    // },
    // {
    //     path: "users/:id",
    //     component: User
    // }
    // {
    //     path: "**",
    //     component: NotFoundComponent
    // }
];
