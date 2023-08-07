import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { UrlValidatorDirective } from './validators/url-validator/url-validator.directive';
import { EmailValidatorDirective } from './validators/email-validator/email-validator.directive';

@NgModule({
  declarations: [
    LoaderComponent,
    UrlValidatorDirective,
    EmailValidatorDirective,
  ],
  imports: [CommonModule],
  exports: [LoaderComponent, UrlValidatorDirective, EmailValidatorDirective],
})
export class SharedModule {}
