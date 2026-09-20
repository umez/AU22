import { Routes } from '@angular/router';
import { courseResolver } from './courses/services/courses.resolver';

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
    resolve: {
      courses: courseResolver
    },
    loadChildren: () => import('./courses/courses.routes').then(m => m.coursesRoutes)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
