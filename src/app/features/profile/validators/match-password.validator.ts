import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('newPassword');
  const confirmPassword = control.get('confirmPassword');

  if (!password || !confirmPassword) {
    return null;
  }

  const isMismatch = password.value !== confirmPassword.value;

  if (isMismatch) {
    const errors = { ...confirmPassword.errors, passwordMismatch: true };
    confirmPassword.setErrors(errors);
    return { passwordMismatch: true };
  } else {
    if (confirmPassword.errors) {
      const { passwordMismatch, ...otherErrors } = confirmPassword.errors;
      const hasErrors = Object.keys(otherErrors).length > 0;
      confirmPassword.setErrors(hasErrors ? otherErrors : null);
    }
  }

  return null;
};
