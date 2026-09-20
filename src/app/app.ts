import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { select, Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatModules } from './mat.modules';
import { AsyncPipe } from '@angular/common';
import { AuthStore } from './auth/store/auth.store';
import { CoursesStore } from './courses/store/courses.store';

@Component({
  imports: [RouterOutlet, ...MatModules, RouterLink],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html'
})
export class App {


  authStore = inject(AuthStore);
  loading = true;
  router = inject(Router)


  ngOnInit() {

    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
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
    this.authStore.logout()
  }
}
