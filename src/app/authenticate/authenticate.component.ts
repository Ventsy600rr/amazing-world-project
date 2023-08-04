import { Component, OnInit } from '@angular/core';
import { UserService } from '../feature/user/user.service';
import { UserCredentials, UserData } from '../types/user.type';
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
        this.userService
          .getUser(user.uid)
          .then((user) => {
            const userObject = user.data();
            const currentUser = userObject!['user'];
            this.userService.setUser(currentUser);
            this.isAuthenticating = false;
          })
          .catch(() => {
            this.userService.setUser(undefined);
            this.userService.logout();
          });
      } else {
        this.userService.setUser(undefined);
        this.isAuthenticating = false;
      }
    });
  }
}
