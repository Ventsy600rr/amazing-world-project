import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
  ValidatorFn,
} from '@angular/forms';
import { appUrlValidator } from './app-url-validator';

@Directive({
  selector: '[appUrlValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: UrlValidatorDirective,
      multi: true,
    },
  ],
})
export class UrlValidatorDirective implements Validator, OnChanges {
  @Input() appUrlValidator: ValidatorFn = () => null;
  validator: ValidatorFn = () => null;
  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }
  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const urlChange = changes['appUrlValidator'];
    if (urlChange) {
      this.validator = appUrlValidator(urlChange.currentValue);
    }
  }
}
