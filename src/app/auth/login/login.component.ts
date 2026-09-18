
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { exhaustMap, tap } from "rxjs/operators";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import { MatModules } from '../../mat.modules';
import { AuthActions } from '../actions/auth.actions';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [MatModules, ReactiveFormsModule]
})
export class LoginComponent {

  form: FormGroup;
  fb = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router)
  store = inject(Store);

  _loginClicks$ = new Subject<{email:string, password: string}>()

  constructor() {
    this.form = this.fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

    this._loginClicks$.pipe(
      exhaustMap(({email, password}) => this.authService.login(email, password)),
      tap(user => console.log({user}))
    ).subscribe({
      next: user => this.store.dispatch(AuthActions.loginSuccess({ user })),
      error: () => this.store.dispatch(AuthActions.loginFailure())
    })

  }


  login() {
    const { email, password } = this.form.value;
    this._loginClicks$.next({email, password});
    this.store.dispatch(AuthActions.login());
  }

}

