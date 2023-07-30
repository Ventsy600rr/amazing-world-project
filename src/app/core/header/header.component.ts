import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/feature/user/user.service';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private userService: UserService, private router: Router) {}

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get user(): User {
    return this.userService.user as User;
  }


  onLogout() {

    this.userService
      .logout()
      .then(() => {
        this.userService.setUser(undefined);
        console.log('User logout');
        this.router.navigate(['home']);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
