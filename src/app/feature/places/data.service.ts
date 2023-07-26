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
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Place } from 'src/app/types/place.type';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private fsd: Firestore) {}

  addPlace(f: any) {
    const collectionRef = collection(this.fsd, 'places');
    return addDoc(collectionRef, f);
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
    console.log(place);
    const editPlace = { ...place };
    return updateDoc(documentRef, editPlace);
  }

  deletePlace(placeId: string) {
    const documentRef = doc(this.fsd, 'places', placeId);
    return deleteDoc(documentRef);
  }
}
