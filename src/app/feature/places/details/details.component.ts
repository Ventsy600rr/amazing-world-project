import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/types/place.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private serviceData: DataService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  place!: Place;
  ngOnInit(): void {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    this.serviceData
      .getPlace(placeId)
      .then((place) => {
        if (place.exists()) {
          this.place = place.data() as Place;
          this.place.id = placeId;
          console.log(place.data());
        } else {
          this.router.navigate(['page-not-found']);
        }
      })
      .catch((err) => {
        console.log(err.message);
        this.router.navigate(['page-not-found']);
      });
  }

  deleteLocation() {
    if (window.confirm(`Are you sure you want to delete ${this.place.title}`)) {
      this.serviceData
        .deletePlace(this.place.id)
        .then(() => {
          this.router.navigate(['catalog']);
          console.log('Place deleted');
        })
        .catch((err) => {
          console.log(err.message);
          this.router.navigate(['page-not-found']);
        });
    }
  }
}
