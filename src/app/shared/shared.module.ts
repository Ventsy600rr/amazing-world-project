import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { UrlValidatorDirective } from './validators/url-validator/url-validator.directive';


@NgModule({
  declarations: [LoaderComponent, UrlValidatorDirective, ],
  imports: [CommonModule],
  exports: [LoaderComponent, UrlValidatorDirective],
})
export class SharedModule {}
