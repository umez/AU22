import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { authReducer } from './auth/reducer';
import { AuthEffects } from './auth/effects/auth.effects';
import { coursesReducer } from './courses/reducer';
import { CoursesEffect } from './courses/courses.effects';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes
    ),
    provideStore({
      'Auth' :  authReducer
    }),
    provideEffects([AuthEffects, CoursesEffect]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      // actionSanitizer: (action) => {
      //   if (action.type === '[Auth] Login') {
      //     return { ...action, password: '***REDACTED***' };
      //   }
      //   return action;
      // },
      // stateSanitizer: (state) => {
      //   // also sanitize if it ever lands in state, as a safety net
      //   return state;
      // }
    }),
  ],
};
