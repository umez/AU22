import { withDevtools } from '@ngrx-toolkit/core';
import { patchState, signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { initialAuthSlice } from "./auth.slice";
import { AuthService } from "../auth.service";
import { User } from "../../auth/model/user.model";
import { computed, inject } from "@angular/core";
import { firstValueFrom, pipe, switchMap, tap } from 'rxjs';
import { withLocalStorage } from '../../custom-features/with-local-storage.feature';
import { Router } from '@angular/router';
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { tapResponse } from "@ngrx/operators";

export const AuthStore = signalStore(
  {providedIn: 'root'},
  withState(initialAuthSlice),
  withProps(() => ({
    _router : inject(Router)
  })),
  withComputed(({ user }) => ({
    isLoggedIn: computed(() => user() !== null)
  })),
  withMethods((store, authService = inject(AuthService)) => {


    return {
      // loadUser: async () => {
      //   const userJson = localStorage.getItem('user');
      //   if (userJson) {
      //     const user = JSON.parse(userJson)
      //     patchState(store, user);
      //   }
      // },

      login: rxMethod<{email: string, password: string}> (
        pipe(
          switchMap(({email, password}) => {
            console.log(email, password)
            return authService.login(email, password).pipe(
              tapResponse({
                next: user => {
                  patchState(store, {user})
                   store._router.navigateByUrl('courses')
                },
                error: error => console.error('Login failed', error)
              })
            )
          })
        ),
      ),
      logout: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, {user: null});
            store._router.navigateByUrl('/login')
          })
        )
      )
    }
  }),
  withLocalStorage('user'),
  withDevtools('auth'),
)
