import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthActions } from "../actions/auth.actions";
import { tap } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthEffects {

  private actions$ = inject(Actions);
  _router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess),
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this._router.navigateByUrl('courses')
      })
    ),
    {
      dispatch: false
    }
  );

  loginFailureAlert$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginFailure),
      tap(() => console.log('Login failed'))
    ),
    { dispatch: false }
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(_ => {
        localStorage.removeItem('user');
        this._router.navigateByUrl('login')
      })
    ),
    {
      dispatch: false
    }
  )

}
