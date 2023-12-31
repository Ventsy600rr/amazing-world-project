import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPlaceComponent } from './add-place/add-place.component';
import { AllPlacesComponent } from './all-places/all-places.component';
import { PlacesRoutingModule } from './places-routing.module';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TopThreeComponent } from './top-three/top-three.component';

@NgModule({
  declarations: [
    AddPlaceComponent,
    AllPlacesComponent,
    EditPlaceComponent,
    DetailsComponent,
    TopThreeComponent,
  ],
  imports: [CommonModule, PlacesRoutingModule, FormsModule, SharedModule],
  exports: [PlacesRoutingModule,TopThreeComponent],
})
export class PlacesModule {}
