import { Routes } from '@angular/router';
import { Home } from './home/home';
import { RoutePaths } from '../shared/routes';
import { ViewStudent } from './features/students/view-student/view-student';
import { ViewCourse } from './features/courses/view-course/view-course';
import { EditStudent } from './features/students/edit-student/edit-student';
import { EditCourse } from './features/courses/edit-course/edit-course';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { authGuard } from '../shared/guards/auth-guard';
import { isAdminGuard } from '../shared/guards/is-admin-guard';
import { Login } from './features/login/login';

export const routes: Routes = [
    {
        path:'',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: RoutePaths.LOGIN,
        component: Login
    },
    {
        path: RoutePaths.HOME,
        component: Home,
        canActivate: [authGuard]
    },
    {
        path: RoutePaths.STUDENTS,
        canActivate: [authGuard],
        loadComponent: () => import('./features/students/students').then(m => m.Students)
    },
    {
        path: RoutePaths.COURSES,
        loadComponent: () => import('./features/courses/courses').then(m => m.Courses),
        canActivate: [authGuard]
    },
    {
        path: RoutePaths.REGISTRATIONS,
        canActivate: [authGuard, isAdminGuard],
        loadComponent: () => import('./features/registrations/registrations').then(m => m.Registrations)
    },
    {
        path: RoutePaths.VIEWSTUDENT,
        component: ViewStudent,
        canActivate: [authGuard]
    },
    {
        path: RoutePaths.EDITSTUDENT,
        component: EditStudent,
        canActivate: [authGuard]
    },
    {
        path: RoutePaths.VIEWCOURSE,
        component: ViewCourse,
        canActivate: [authGuard]
    },
    {
        path: RoutePaths.EDITCOURSE,
        component: EditCourse,
        canActivate: [authGuard]
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
