import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/feature/user/user.service';

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

  onLogout() {
    this.userService
      .logout()
      .then(() => {
        this.userService.setUser(null);
        console.log('User logout');
        this.router.navigate(['home']);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
}
