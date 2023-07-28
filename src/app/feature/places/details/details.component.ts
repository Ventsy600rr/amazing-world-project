import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/types/place.type';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  
  place!: Place;

  constructor(
    private serviceData: DataService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get isOwner(): boolean {
    return this.place.creator.uid == this.userService.user?.uid;
  }

  get isLiked(): boolean {
    const userId = this.userService.user?.uid;
    if (userId) {
      return this.place.likes.includes(userId);
    }
    return false;
  }

  onLike() {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    const userId = this.userService.user?.uid;
    console.log('click',userId)
    if (userId) {
      if (this.isLiked) {
        this.serviceData.remuveLike(placeId, userId);
      } else {
        this.serviceData.addLike(placeId, userId);
      }
    }
  }

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

  deleteLocation() {
    if (
      this.isLogged &&
      window.confirm(`Are you sure you want to delete ${this.place.title}`)
    ) {
      this.serviceData
        .deletePlace(this.place.id!)
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
