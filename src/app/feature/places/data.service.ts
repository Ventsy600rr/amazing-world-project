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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Place } from 'src/app/types/place.type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private fsd: Firestore) {}

  addPlace(place: Place) {
    console.log(place);
    const collectionRef = collection(this.fsd, 'places');
    return addDoc(collectionRef, place);
  }

  getPlaces(): Observable<DocumentData[]> {
    const collectionRef = collection(this.fsd, 'places');
    return collectionData(collectionRef, { idField: 'id' });
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

  deletePlace(placeId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return deleteDoc(documentRef);
  }
}
