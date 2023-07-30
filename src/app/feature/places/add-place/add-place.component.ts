import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { appUrlValidator } from 'src/app/shared/validators/url-validator/app-url-validator';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Place } from 'src/app/types/place.type';
import { User } from 'src/app/types/user.type';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-place',
  templateUrl: './add-place.component.html',
  styleUrls: ['./add-place.component.css'],
})
export class AddPlaceComponent {
  constructor(
    private serviceData: DataService,
    private userService: UserService,
    private router: Router,
    private popupService: NgToastService
  ) {}
  urlValidator = appUrlValidator;
  addLocation(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { title, name, location, imageUrl, description } = form.value;
    const creator: User = {
      email: this.userService.user?.email,
      uid: this.userService.user?.uid,
    };

    const newPlace: Place = {
      title,
      name,
      location,
      imageUrl,
      description,
      likes: [],
      visited: [],
      favorites: [],
      creator,
    };

    this.serviceData
      .addPlace(newPlace)
      .then(() => {
        this.router.navigate(['catalog']);
        console.log('Succses!');
      })
      .catch((err) => {
        this.popupService.error({
          detail: `${err.message}`,
          position: 'topCenter',
          duration: 3000,
        });
        console.log(err.message);
      });
  }
}
