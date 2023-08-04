import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/types/place.type';
import { DataService } from '../../places/data.service';
import { UserService } from '../user.service';
import { NgToastService } from 'ng-angular-popup';
import { ActivatedRoute, Router } from '@angular/router';
import { UserData } from 'src/app/types/user.type';

@Component({
  selector: 'app-creator',
  templateUrl: './creator.component.html',
  styleUrls: ['./creator.component.css'],
})
export class CreatorComponent implements OnInit {
  creator!: UserData;

  constructor(
    private serviceData: DataService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private popupService: NgToastService
  ) {}

  isLoading: boolean = true;

  places: Place[] = [];

  ngOnInit(): void {
    const creatorId: string = this.activatedRoute.snapshot.params['creatorId'];
    this.userService
      .getUser(creatorId)
      .then((user) => {
        const userObject = user.data();
        const currentCreator = userObject!['user'];
        this.creator = currentCreator;
      })
      .catch(() => {
        this.router.navigate(['/place/catalog']);
      });
    this.serviceData
      .getUserPlaces(creatorId)
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
        this.popupService.error({
          detail: `${err.message}`,
          position: 'topCenter',
          duration: 3000,
        });
        console.log(err.message);
      });
  }
}
