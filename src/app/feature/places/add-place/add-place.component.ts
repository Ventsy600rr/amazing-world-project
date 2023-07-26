import { Component } from '@angular/core';
import { NgForm, ValidatorFn } from '@angular/forms';
import { appUrlValidator } from 'src/app/shared/validators/url-validator/app-url-validator';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
})
export class AddPlaceComponent {
  constructor(private serviceData: DataService, private router: Router) {}
  urlValidator = appUrlValidator;
  addLocation(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.serviceData
      .addPlace(form.value)
      .then(() => {
        this.router.navigate(['catalog']);
        console.log('Succses!');
      })
      .catch((err) => {
        console.log(err.message);
        this.router.navigate(['page-not-found']);
      });
  }
}
