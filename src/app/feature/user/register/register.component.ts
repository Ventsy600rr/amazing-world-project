import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user.type';
import { NgToastService } from 'ng-angular-popup';

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
  onRegister(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const { email, password } = form.value;
    this.userService
      .register(email, password)
      .then((userData) => {
        const user = userData.user as User;
        this.userService.setUser(user);
        this.router.navigate(['catalog']);
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
