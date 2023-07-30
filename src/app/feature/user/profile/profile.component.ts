import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from 'src/app/types/user.type';
import { DataService } from '../../places/data.service';
import { Place } from 'src/app/types/place.type';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}

  isLoading: boolean = false;
 
  ngOnInit(): void {}

  get user(): User {
    return this.userService.user as User;
  }

  places: Place[] = [];
  section: string = '';
  onMyPlaces() {
    this.isLoading = true;
    const userId = this.user.uid as string;
    this.places = [];
    this.section = 'My Places';
    this.dataService
      .getUserPlaces(userId)
      .then((places) => {
        places.forEach((place) => {
          const currentPlace = place.data() as Place;
          currentPlace['id'] = place.id;
          this.places.push(currentPlace);
        });
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
  }

  onMyVisited() {
    this.isLoading = true;
    const userId = this.user.uid as string;
    this.places = [];
    this.section = 'Visited Places';
    this.dataService
      .getUserVisited(userId)
      .then((places) => {
        places.forEach((place) => {
          const currentPlace = place.data() as Place;
          currentPlace['id'] = place.id;
          this.places.push(currentPlace);
        });
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
  }

  onMyFavorites() {
    this.isLoading = true;
    const userId = this.user.uid as string;
    this.places = [];
    this.section = 'Favorite Places';
    this.dataService
      .getUserFavorites(userId)
      .then((places) => {
        places.forEach((place) => {
          const currentPlace = place.data() as Place;
          currentPlace['id'] = place.id;
          this.places.push(currentPlace);
        });
        this.isLoading = false;
      })
      .catch((err) => {
        this.isLoading = false;
        console.log(err);
      });
  }
}
