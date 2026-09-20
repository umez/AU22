import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { isLoggedIn } from "./selectors/auth.selector";
import { map } from "rxjs";

export const AuthGuard: CanActivateFn = () => {

  const store = inject(Store);
  const router = inject(Router);

  return store.select(isLoggedIn).pipe(
    map(loggedIn => loggedIn ? true : router.createUrlTree(['/login']))
  )

}
