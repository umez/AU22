import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { CoursesStore } from './courses/store/courses.store';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
  },
  {
    path: 'courses',
    canActivate: [authGuard],
    providers: [CoursesStore],
    loadChildren: () => import('./courses/courses.routes').then(m => m.coursesRoutes)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
