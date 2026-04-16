import { FormGroup } from '@angular/forms';

export class FormUtils {
  static readonly DB_LIMITS = {
    SHORT: 100,
    STANDARD: 255,
    LONG: 2000,
  };

  static hasErrors(form: FormGroup, controlName: string, errorType: string) {
    const control = form.get(controlName);
    return control?.hasError(errorType) && control?.touched;
  }

  static hasAnyError(form: FormGroup, controlName: string) {
    const control = form.get(controlName);
    return control?.invalid && control?.touched;
  }
}
