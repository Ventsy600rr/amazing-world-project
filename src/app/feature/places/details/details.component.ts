import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/types/place.type';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
  place!: Place;
  subscription: Subscription;
  constructor(
    private serviceData: DataService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.subscription = this.serviceData.place$.subscribe((place) => {
      this.place = place as Place;
    });
  }

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

  get isVisited(): boolean {
    const userId = this.userService.user?.uid;
    if (userId) {
      return this.place.visited.includes(userId);
    }
    return false;
  }

  get isFavorite(): boolean {
    const userId = this.userService.user?.uid;
    if (userId) {
      return this.place.favorites.includes(userId);
    }
    return false;
  }

  onLike() {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    const userId = this.userService.user?.uid;

    if (userId) {
      if (this.isLiked) {
        this.serviceData
          .remuveLike(placeId, userId)
          .then(() => {
            this.serviceData.getPlace(placeId).then((place) => {
              const updPlase = place.data() as Place;
              this.serviceData.setPlace(updPlase);
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        this.serviceData
          .addLike(placeId, userId)
          .then(() => {
            this.serviceData.getPlace(placeId).then((place) => {
              const updPlase = place.data() as Place;
              this.serviceData.setPlace(updPlase);
            });
          })
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }

  onVisit() {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    const userId = this.userService.user?.uid;

    if (userId) {
      if (this.isVisited) {
        this.serviceData
          .remuveVisitor(placeId, userId)
          .then(() => {})
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        this.serviceData
          .addVisitor(placeId, userId)
          .then(() => {})
          .catch((err) => {
            console.log(err.message);
          });
      }
    }
  }

  onFavorite() {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    const userId = this.userService.user?.uid;

    if (userId) {
      if (this.isFavorite) {
        this.serviceData
          .remuveFromFavorite(placeId, userId)
          .then(() => {})
          .catch((err) => {
            console.log(err.message);
          });
      } else {
        this.serviceData
          .addToFavorite(placeId, userId)
          .then(() => {})
          .catch((err) => {
            console.log(err.message);
          });
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
      this.isOwner &&
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
