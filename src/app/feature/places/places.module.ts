import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlaceComponent } from './add-place/add-place.component';
import { AllPlacesComponent } from './all-places/all-places.component';
import { PlacesRoutingModule } from './places-routing.module';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { UrlValidatorDirective } from 'src/app/shared/validators/url-validator/url-validator.directive';
import { LoaderComponent } from '../../shared/loader/loader/loader.component';


@NgModule({
  declarations: [
    AddPlaceComponent,
    AllPlacesComponent,
    EditPlaceComponent,
    DetailsComponent,
    UrlValidatorDirective,
    LoaderComponent
  ],
  imports: [CommonModule, PlacesRoutingModule, FormsModule],
  exports: [PlacesRoutingModule],
})
export class PlacesModule {}
