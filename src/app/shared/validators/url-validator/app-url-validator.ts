import { AbstractControl, ValidatorFn } from '@angular/forms';

export function appUrlValidator(control: AbstractControl): ValidatorFn {
  const pattern = new RegExp('^https?://.+$');
  return (control) => {
    return control.value !== '' && pattern.test(control.value)
      ? null
      : { appUrlValidator: true };
  };
}
