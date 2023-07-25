import { Component } from '@angular/core';
import { NgForm, ValidatorFn } from '@angular/forms';
import { appUrlValidator } from 'src/app/shared/validators/url-validator/app-url-validator';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
})
export class AddPlaceComponent {
  urlValidator = appUrlValidator;
  addLocation(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
  }
}
