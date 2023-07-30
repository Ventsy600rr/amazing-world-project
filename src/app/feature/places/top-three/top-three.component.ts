import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Place } from 'src/app/types/place.type';

@Component({
  selector: 'app-top-three',
  templateUrl: './top-three.component.html',
  styleUrls: ['./top-three.component.css'],
})
export class TopThreeComponent {
  constructor(private serviceData: DataService) {}

  places: Place[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.serviceData
      .getTopThree()
      .then((places) => {
        places.forEach((place) => {
          const currentPlace = place.data() as Place;
          currentPlace['id'] = place.id;
          this.places.push(currentPlace);
        });
        console.log(this.places);
      })
      .catch((err) => {});
  }
}
