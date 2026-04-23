import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { UpdatePassword, User } from '../../../../core/auth/models/user.model';
import {
  updatePassword,
  updatePasswordSuccess,
} from '../../../../core/auth/store/actions/auth.actions';
import { selectUser } from '../../../../core/auth/store/selectors/auth.selector';
import { FormUtils } from '../../../../shared/utils/form.utils';
import { passwordMatchValidator } from '../../validators/match-password.validator';

@Component({
  selector: 'app-profile-password-change',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-password-change.component.html',
  styleUrl: './profile-password-change.component.scss',
})
export class ProfilePasswordChangeComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);
  private actions$ = inject(Actions);
  private destroyRef = inject(DestroyRef);

  private user!: User;

  passwordChangeForm = this.fb.nonNullable.group(
    {
      oldPassword: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
      newPassword: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
    },
    {
      validators: [passwordMatchValidator],
    },
  );

  ngOnInit(): void {
    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.user = user;
        }
      });

    this.actions$
      .pipe(ofType(updatePasswordSuccess), takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.passwordChangeForm.reset();
      });
  }

  onSubmit() {
    if (this.passwordChangeForm.valid) {
      if (!this.user.id) {
        return;
      }
      const passwordData: UpdatePassword = this.passwordChangeForm.getRawValue();
      this.updatePassword(this.user.id, passwordData);
    } else {
      this.passwordChangeForm.markAllAsTouched();
    }
  }

  updatePassword(user_id: number, passwordData: UpdatePassword) {
    this.store.dispatch(updatePassword({ user_id, passwordData }));
  }

  hasErrors(controlName: string, errorType: string) {
    return FormUtils.hasErrors(this.passwordChangeForm, controlName, errorType);
  }

  hasAnyError(controlName: string) {
    return FormUtils.hasAnyError(this.passwordChangeForm, controlName);
  }
}
