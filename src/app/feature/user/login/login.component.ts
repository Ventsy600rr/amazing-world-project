import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserCredentials, UserData } from 'src/app/types/user.type';
import { NgToastService } from 'ng-angular-popup';
import { appEmailValidator } from 'src/app/shared/validators/email-validator/app-email-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  appEmail = appEmailValidator;
  
  constructor(
    private userService: UserService,
    private router: Router,
    private popupService: NgToastService
  ) {}

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { email, password } = form.value;

    this.userService
      .login(email, password)
      .then((userData) => {
        const currentUserId = userData.user.uid;
        return this.userService
          .getUser(currentUserId)
          .then((user) => {
            const userObject = user.data();
            const currentUser = userObject!['user'];
            this.userService.setUser(currentUser);
          })
          .catch(() => {
            this.userService.setUser(undefined);
            this.userService.logout();
          });
      })
      .then(() => {
        this.router.navigate(['/place/catalog']);
      })
      .catch((err) => {
        this.popupService.error({
          detail: `${err.message}`,
          position: 'topCenter',
          duration: 3000,
        });
        form.reset();
        console.log(err.message);
      });
  }
}
