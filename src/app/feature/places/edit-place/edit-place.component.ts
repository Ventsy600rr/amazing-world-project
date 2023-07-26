import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { Place } from 'src/app/types/place.type';
import { appUrlValidator } from 'src/app/shared/validators/url-validator/app-url-validator';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-place',
  templateUrl: './edit-place.component.html',
  styleUrls: ['./edit-place.component.css'],
})
export class EditPlaceComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private serviceData: DataService,
    private router: Router
  ) {}
  urlValidator = appUrlValidator;
  place!: Place;

  ngOnInit(): void {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];

    this.serviceData
      .getPlace(placeId)
      .then((place) => {
        if (place.exists()) {
          this.place = place.data() as Place;
          this.place.id = placeId;
        } else {
          this.router.navigate(['page-not-found']);
        }
      })
      .catch((err) => {
        console.log(err.message);
        this.router.navigate(['page-not-found']);
      });
  }

  editLocation(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    this.serviceData
      .editPlace(placeId, form.value)
      .then(() => {
        console.log('Place edited');
        this.router.navigate([`${placeId}/details`]);
      })
      .catch((err) => {
        console.log(err.message);
        this.router.navigate(['page-not-found']);
      });
  }
}
