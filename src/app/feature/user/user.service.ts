import { Injectable, OnDestroy } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
} from '@angular/fire/firestore';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserCredentials, UserData } from 'src/app/types/user.type';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  private user$$ = new BehaviorSubject<UserData | undefined>(undefined);
  user$ = this.user$$.asObservable();

  user!: UserData | undefined;
  subscription: Subscription;

  constructor(private fsd: Firestore) {
    this.subscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  setUser(user: UserData | undefined) {
    this.user$$.next(user);
  }

  get isLogged(): boolean {
    return !!this.user;
    
  }

  login(email: string, password: string) {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
  }

  getUser(userId: string) {
    const documentRef = doc(this.fsd, 'users', userId);
    return getDoc(documentRef);
  }
  addUser(user: UserData) {
    return setDoc(doc(this.fsd, 'users', user.uid!), { user });
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
