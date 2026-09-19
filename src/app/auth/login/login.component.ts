import { MatFormField, MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";

import { AuthService } from "../auth.service";
import { tap } from "rxjs/operators";
import { noop } from "rxjs";
import { Router } from "@angular/router";
import { MatModules } from '../../mat.modules';
import { AuthStore } from '../store/auth.store';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatModules, ReactiveFormsModule]
})
export class LoginComponent {

  form: FormGroup;
  _fb = inject(FormBuilder);
  _auth = inject(AuthService);
  _router = inject(Router);

  readonly store = inject(AuthStore);

  constructor() {

    this.form = this._fb.group({
      email: ['test@angular-university.io', [Validators.required]],
      password: ['test', [Validators.required]]
    });

    effect(() => {
      console.log(this.store)
    })

  }


  async login() {
    const {email, password} = this.form.value;
    await this.store.login(email, password);
    this._router.navigateByUrl('courses')
  }

}

