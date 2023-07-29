import { Component, OnInit } from '@angular/core';
import { UserService } from '../feature/user/user.service';
import { User } from '../types/user.type';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css'],
})
export class AuthenticateComponent implements OnInit {
  isAuthenticating = true;

  constructor(private userService: UserService) {}
  ngOnInit(): void {
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        let logUser = user as User;
        this.userService.setUser(logUser);
        this.isAuthenticating = false;
      } else {
        this.userService.setUser(undefined);
        this.isAuthenticating = false;
      }
    });
  }
}
