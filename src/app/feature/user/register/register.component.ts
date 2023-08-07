import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UserData } from 'src/app/types/user.type';
import { NgToastService } from 'ng-angular-popup';
import { appEmailValidator } from 'src/app/shared/validators/email-validator/app-email-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private userService: UserService,
    private router: Router,
    private popupService: NgToastService
  ) {}

  appEmail = appEmailValidator;

  onRegister(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    console.log(form.value);
    const { email, username, bio, password } = form.value;

    this.userService
      .register(email, password)
      .then((userData) => {
        const user: UserData = {
          email: userData.user.email!,
          uid: userData.user.uid,
          username,
          bio,
        };
        return this.userService.addUser(user);
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
