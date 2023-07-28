import { Injectable, OnDestroy } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
 
} from 'firebase/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { User } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<User | undefined>(undefined);
  user$ = this.user$$.asObservable();

  user!: User | undefined;
  subscription: Subscription;


  constructor() {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  setUser(user: User | undefined) {
    this.user$$.next(user);
    console.log(user);
  }

  get isLogged(): boolean {
    return !!this.user;
  }

  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  register(email: string, password: string) {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
  }

  logout() {
    const auth = getAuth();
    return signOut(auth);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
