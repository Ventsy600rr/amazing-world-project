import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/types/user.type';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private userService: UserService, private router: Router) {}
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
        form.reset();
        console.log(err.message);
      });
  }
}
