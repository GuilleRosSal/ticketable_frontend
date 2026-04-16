import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { ProfileData, User } from '../../../../core/auth/models/user.model';
import { updateProfileData } from '../../../../core/auth/store/actions/auth.actions';
import { selectUser } from '../../../../core/auth/store/selectors/auth.selector';
import { FormUtils } from '../../../../shared/utils/form.utils';

@Component({
  selector: 'app-profile-main-data',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-main-data.component.html',
  styleUrl: './profile-main-data.component.scss',
})
export class ProfileMainDataComponent implements OnInit {
  private store = inject(Store);
  private fb = inject(FormBuilder);

  private user!: User;

  profileDataForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)]],
    surname: ['', [Validators.required, Validators.maxLength(FormUtils.DB_LIMITS.STANDARD)]],
    email: [
      '',
      [Validators.required, Validators.email, Validators.maxLength(FormUtils.DB_LIMITS.SHORT)],
    ],
  });

  ngOnInit(): void {
    this.store
      .select(selectUser)
      .pipe(take(1))
      .subscribe((user) => {
        if (user) {
          this.user = user;
          this.loadFields();
        }
      });
  }

  loadFields() {
    this.profileDataForm.patchValue(this.user);
  }

  onSubmit() {
    if (this.profileDataForm.valid) {
      if (!this.user.id) {
        return;
      }
      const profileData = this.profileDataForm.getRawValue();
      this.updateProfileData(this.user.id, profileData);
    } else {
      this.profileDataForm.markAllAsTouched();
    }
  }

  updateProfileData(user_id: number, profileData: ProfileData) {
    this.store.dispatch(updateProfileData({ user_id, profileData }));
  }

  hasErrors(controlName: string, errorType: string) {
    return FormUtils.hasErrors(this.profileDataForm, controlName, errorType);
  }

  hasAnyError(controlName: string) {
    return FormUtils.hasAnyError(this.profileDataForm, controlName);
  }
}
