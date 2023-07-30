import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/feature/places/data.service';
import { UserService } from 'src/app/feature/user/user.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private dataService: DataService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    let place = this.dataService.place;
    let user = this.userService.user;

    let isAuthorizated = false;

    if (place && user) {
      isAuthorizated = place.creator.uid == user.uid;
    }

    if (!isAuthorizated) {
      this.router.navigate(['/catalog']);
    }
    
    return isAuthorizated;
  }
}
