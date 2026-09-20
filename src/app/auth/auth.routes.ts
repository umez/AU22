import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { provideState } from "@ngrx/store";
import { authReducer } from "./reducer";
import { provideEffects } from "@ngrx/effects";
import { AuthEffects } from "./effects/auth.effects";

export const authRoutes: Routes = [
  {
    path: '',

    component: LoginComponent

  }
];
