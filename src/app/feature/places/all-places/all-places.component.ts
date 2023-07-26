import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Place } from 'src/app/types/place.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-places',
  templateUrl: './all-places.component.html',
  styleUrls: ['./all-places.component.css'],
})
export class AllPlacesComponent implements OnInit {
  constructor(private serviceData: DataService, private router: Router) {}
  places: Place[] = [];

  ngOnInit(): void {
    this.serviceData.getPlaces().subscribe({
      next: (places) => {
        this.places = places as Place[];
      },
      error: (err) => {
        this.router.navigate(['page-not-found']);
        console.log(err.message);
      },
    });
  }
}
