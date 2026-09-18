import { AuthActions } from './auth/actions/auth.actions';
import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map, tap } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatModules } from './mat.modules';
import { AsyncPipe } from '@angular/common';
import { isLoggedIn } from './auth/selectors/auth.selector';
import { User } from './auth/model/user.model';

@Component({
  imports: [RouterOutlet, ...MatModules, RouterLink, AsyncPipe],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  loading = true;
  store = inject(Store);
  router = inject(Router);

  isLoggedIn$!: Observable<boolean>;

  constructor() {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      const {user} = JSON.parse(userJson);
      this.store.dispatch(AuthActions.loginSuccess({user}))
    }
  }

  ngOnInit() {
    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    )
    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          console.log('eendaaa  ')
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}

