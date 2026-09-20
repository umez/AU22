import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducer";

export const selectAuthSate = createFeatureSelector<AuthState>('Auth');

export const isLoggedIn = createSelector(
  selectAuthSate,
  (auth) => {
    console.log(auth);
    return !!auth.user
  }
)

// export const isLoggout = createSelector(
//   state => state['auth'],
//   (auth) => !!auth.user
// )
