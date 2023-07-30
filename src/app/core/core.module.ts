import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main/main.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgToastModule } from 'ng-angular-popup';

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
  imports: [CommonModule, AppRoutingModule, NgToastModule],
  exports: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    PageNotFoundComponent,
  ],
})
export class CoreModule {}
