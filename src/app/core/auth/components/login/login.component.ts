import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormUtils } from '../../../../shared/utils/form.utils';
import { LoginCredentials } from '../../models/auth.model';
import { login } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)],
    ],
    password: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials: LoginCredentials = this.loginForm.getRawValue();
      this.login(credentials);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  private login(credentials: LoginCredentials) {
    this.store.dispatch(login({ credentials }));
  }

  hasErrors(controlName: string, errorType: string) {
    return FormUtils.hasErrors(this.loginForm, controlName, errorType);
  }

  hasAnyError(controlName: string) {
    return FormUtils.hasAnyError(this.loginForm, controlName);
  }
}
