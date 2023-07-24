import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlaceComponent } from './add-place/add-place.component';
import { AllPlacesComponent } from './all-places/all-places.component';
import { PlacesRoutingModule } from './places-routing.module';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [AddPlaceComponent, AllPlacesComponent, EditPlaceComponent, DetailsComponent],
  imports: [CommonModule, PlacesRoutingModule],
})
export class PlacesModule {}
