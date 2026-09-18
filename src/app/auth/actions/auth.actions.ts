import { createActionGroup, props, emptyProps } from '@ngrx/store';
import { User } from "../model/user.model";


// export const loginStart = createAction(
//   "[Login page] Login Start"
// )

// export const loginSuccess = createAction(
//   "[Login page] User Success",
//   props<{user: User}>()
// )

// export const loginFailure = createAction(
//   "[Login page] User Failure"
// )



export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login': emptyProps(),
    'Login Success': props<{ user: User }>(),
    'Login Failure': emptyProps(),
    'logout': emptyProps()
  }
});
