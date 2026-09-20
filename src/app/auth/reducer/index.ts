import { createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../actions/auth.actions";

export interface AuthState {
  user: User | null
}

const initialAuthState : AuthState = {user: null}

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.login, state => ({
    ...state
  })),

  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    user
  })),

  on(AuthActions.loginFailure,  state => ({
    ...state
  })),

  on(AuthActions.logout, state => ({
    ...state,
    user: null
  }))

)
