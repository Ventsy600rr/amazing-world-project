import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { CoreModule } from './core/core.module';
import { FeatureModule } from './feature/feature.module';

import * as firebase from 'firebase/app';
import { AuthenticateComponent } from './authenticate/authenticate.component';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent, AuthenticateComponent],
  imports: [
    FeatureModule,
    BrowserModule,
    CoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
