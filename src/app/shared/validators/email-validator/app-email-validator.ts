import { AbstractControl, ValidatorFn } from '@angular/forms';

export function appEmailValidator(control: AbstractControl): ValidatorFn {
  const pattern = new RegExp('^[^@]+@([a-zA-Z]+).([a-zA-Z]+)$');
  return (control) => {
    return control.value === '' || pattern.test(control.value)
      ? null
      : { appEmailValidator: true };
  };
}
