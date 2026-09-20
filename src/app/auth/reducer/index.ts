import { createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../actions/auth.actions";

export interface AuthState {
  user: User | null,
  isBusy: boolean
}

const initialAuthState : AuthState = {user: null, isBusy : false}

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, state => ({
    ...state, isBusy: true
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user,
    isBusy: false
  })),

  on(AuthActions.loginFailure,  state => ({
    ...state,
    isBusy: false
  })),

  on(AuthActions.logout, state => ({
    ...state,
    user: null,
    isBusy: false
  }))

)
