import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  DocumentData,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  where,
  query,
  getDocs,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { Place } from 'src/app/types/place.type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private place$$ = new BehaviorSubject<Place | undefined>(undefined);
  place$ = this.place$$.asObservable();

  constructor(private fsd: Firestore) {}

  setPlace(place: Place | undefined) {
    this.place$$.next(place);
  }

  addPlace(place: Place) {
    const collectionRef = collection(this.fsd, 'places');
    return addDoc(collectionRef, place);
  }

  getPlaces(): Observable<DocumentData[]> {
    const collectionRef = collection(this.fsd, 'places');
    return collectionData(collectionRef, { idField: 'id' });
  }

  getUserPlaces(userId: string) {
    const collectionRef = collection(this.fsd, 'places');
    const q = query(collectionRef, where('creator.uid', '==', userId));
    return getDocs(q);
  }

  getUserVisited(userId: string) {
    const collectionRef = collection(this.fsd, 'places');
    const q = query(collectionRef, where('visited', 'array-contains', userId));
    return getDocs(q);
  }

  getUserFavorites(userId: string) {
    const collectionRef = collection(this.fsd, 'places');
    const q = query(collectionRef, where('favorites', 'array-contains', userId));
    return getDocs(q);
  }

  getPlace(placeId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return getDoc(documentRef);
  }

  editPlace(placeId: string, place: Place) {
    const documentRef = doc(this.fsd, 'places', placeId);
    const editPlace = { ...place };
    return updateDoc(documentRef, editPlace);
  }

  addLike(placeId: string, userId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return updateDoc(documentRef, {
      likes: arrayUnion(userId),
    });
  }

  remuveLike(placeId: string, userId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return updateDoc(documentRef, {
      likes: arrayRemove(userId),
    });
  }

  addVisitor(placeId: string, userId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return updateDoc(documentRef, {
      visited: arrayUnion(userId),
    });
  }

  remuveVisitor(placeId: string, userId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return updateDoc(documentRef, {
      visited: arrayRemove(userId),
    });
  }

  addToFavorite(placeId: string, userId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return updateDoc(documentRef, {
      favorites: arrayUnion(userId),
    });
  }

  remuveFromFavorite(placeId: string, userId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return updateDoc(documentRef, {
      favorites: arrayRemove(userId),
    });
  }

  deletePlace(placeId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return deleteDoc(documentRef);
  }
}
