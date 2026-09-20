import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './auth/effects/auth.effects';
import { provideEntityData, withEffects } from '@ngrx/data';
import { authReducer } from './auth/reducer';
import { entityConfig } from './courses/course.entitydata';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    // provideHttpClient()
    provideStore({
      'Auth' :  authReducer
    }),
    provideEffects([AuthEffects]),
    provideEntityData(entityConfig, withEffects()),

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
  ]
};
