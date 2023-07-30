import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPlacesComponent } from './all-places/all-places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { DetailsComponent } from './details/details.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { AuthorizationGuard } from 'src/app/shared/guards/authorization.guard';

const routes: Routes = [
  {
    path: 'catalog',
    component: AllPlacesComponent,
  },
  {
    path: 'create',
    component: AddPlaceComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: ':placeId/details',
    component: DetailsComponent,
  },
  {
    path: ':placeId/edit',
    component: EditPlaceComponent,
    canActivate: [AuthorizationGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesRoutingModule {}
