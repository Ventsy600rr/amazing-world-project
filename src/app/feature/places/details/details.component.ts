import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from 'src/app/types/place.type';
import { UserService } from '../../user/user.service';
import { Subscription } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

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
    private router: Router,
    private popupService: NgToastService
  ) {
    this.subscription = this.serviceData.place$.subscribe((place) => {
      this.place = place as Place;
    });
  }

  isLoading: boolean = true;

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
              this.popupService.error({
                detail: 'Location unliked!',
                position: 'topCenter',
                duration: 3000,
              });
            });
          })
          .catch((err) => {
            this.popupService.error({
              detail: `${err.message}`,
              position: 'topCenter',
              duration: 3000,
            });
            console.log(err.message);
          });
      } else {
        this.serviceData
          .addLike(placeId, userId)
          .then(() => {
            this.serviceData.getPlace(placeId).then((place) => {
              const updPlase = place.data() as Place;
              this.serviceData.setPlace(updPlase);
              this.popupService.success({
                detail: 'Location liked!',
                position: 'topCenter',
                duration: 3000,
              });
            });
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
  }

  onVisit() {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    const userId = this.userService.user?.uid;

    if (userId) {
      if (this.isVisited) {
        this.serviceData
          .remuveVisitor(placeId, userId)
          .then(() => {
            this.serviceData.getPlace(placeId).then((place) => {
              const updPlase = place.data() as Place;
              this.serviceData.setPlace(updPlase);
              this.popupService.error({
                detail: 'Location removed from visited list!',
                position: 'topCenter',
                duration: 3000,
              });
            });
          })
          .catch((err) => {
            this.popupService.error({
              detail: `${err.message}`,
              position: 'topCenter',
              duration: 3000,
            });
            console.log(err.message);
          });
      } else {
        this.serviceData
          .addVisitor(placeId, userId)
          .then(() => {
            this.serviceData.getPlace(placeId).then((place) => {
              const updPlase = place.data() as Place;
              this.serviceData.setPlace(updPlase);
              this.popupService.success({
                detail: 'Location added to visited list!',
                position: 'topCenter',
                duration: 3000,
              });
            });
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
  }

  onFavorite() {
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    const userId = this.userService.user?.uid;

    if (userId) {
      if (this.isFavorite) {
        this.serviceData
          .remuveFromFavorite(placeId, userId)
          .then(() => {
            this.serviceData.getPlace(placeId).then((place) => {
              const updPlase = place.data() as Place;
              this.serviceData.setPlace(updPlase);
              this.popupService.error({
                detail: 'Location removed from favorite list!',
                position: 'topCenter',
                duration: 3000,
              });
            });
          })
          .catch((err) => {
            this.popupService.error({
              detail: `${err.message}`,
              position: 'topCenter',
              duration: 3000,
            });
            console.log(err.message);
          });
      } else {
        this.serviceData
          .addToFavorite(placeId, userId)
          .then(() => {
            this.serviceData.getPlace(placeId).then((place) => {
              const updPlase = place.data() as Place;
              this.serviceData.setPlace(updPlase);
              this.popupService.success({
                detail: 'Location added to favorite list!',
                position: 'topCenter',
                duration: 3000,
              });
            });
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
  }

  ngOnInit(): void {
    const s = this.userService.user
    console.log(s)
    const placeId: string = this.activatedRoute.snapshot.params['placeId'];
    this.serviceData
      .getPlace(placeId)
      .then((place) => {
        if (place.exists()) {
          this.place = place.data() as Place;
          this.place.id = placeId;
          this.serviceData.setPlace(this.place);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.router.navigate(['page-not-found']);
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.popupService.error({
          detail: `${err.message}`,
          position: 'topCenter',
          duration: 3000,
        });
        console.log(err.message);
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
          this.router.navigate(['/place/catalog']);
          console.log('Place deleted');
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
