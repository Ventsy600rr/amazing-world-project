import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllPlacesComponent } from './all-places/all-places.component';
import { AddPlaceComponent } from './add-place/add-place.component';
import { DetailsComponent } from './details/details.component';
import { EditPlaceComponent } from './edit-place/edit-place.component';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const routes: Routes = [
  {
    path: 'catalog',
    component: AllPlacesComponent,
  },
  {
    path: 'create',
    component: AddPlaceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':placeId/details',
    component: DetailsComponent,
  },
  {
    path: ':placeId/edit',
    component: EditPlaceComponent,
    canActivate: [AuthGuard],
    data: { AuthGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesRoutingModule {}
