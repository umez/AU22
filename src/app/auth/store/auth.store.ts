import { withDevtools } from '@ngrx-toolkit/core';
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { initialAuthSlice } from "./auth.slice";
import { AuthService } from "../auth.service";
import { User } from "../../auth/model/user.model";
import { inject } from "@angular/core";
import { firstValueFrom } from 'rxjs';
import { withLocalStorage } from '../../custom-features/with-local-storage.feature';

export const AuthStore = signalStore(
  {providedIn: 'root'},
  withState(initialAuthSlice),
  withMethods((store) => {
    const authService = inject(AuthService);

    return {
      // loadUser: async () => {
      //   const userJson = localStorage.getItem('user');
      //   if (userJson) {
      //     const user = JSON.parse(userJson)
      //     patchState(store, user);
      //   }
      // },

      login: async (email: string, password: string) => {
        const user = await firstValueFrom(authService.login(email, password))
        if (user) {
          // localStorage.setItem('user', JSON.stringify(user));
          patchState(store, {user});
        }
      },

      logout: async () => {
        patchState(store, {user: null});
      }
    }
  }),
  withLocalStorage('user'),
  withDevtools('auth'),
)
