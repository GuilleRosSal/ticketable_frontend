import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { FormUtils } from '../../../../shared/utils/form.utils';
import { RegisterData } from '../../models/auth.model';
import { UserRole } from '../../models/user.model';
import { register } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  registerForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
    surname: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.STANDARD)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)],
    ],
    password: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const registerData = {
        ...this.registerForm.getRawValue(),
        role: UserRole.CLIENT,
      };
      this.register(registerData);
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  private register(registerData: RegisterData) {
    this.store.dispatch(register({ registerData }));
  }

  hasErrors(controlName: string, errorType: string) {
    return FormUtils.hasErrors(this.registerForm, controlName, errorType);
  }

  hasAnyError(controlName: string) {
    return FormUtils.hasAnyError(this.registerForm, controlName);
  }
}
