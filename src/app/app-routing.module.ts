import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./feature/user/user.module').then((module) => module.UserModule),
  },
  {
    path: 'place',
    loadChildren: () =>
      import('./feature/places/places.module').then(
        (module) => module.PlacesModule
      ),
  },
  {
    path: 'page-not-found',
    component: PageNotFoundComponent,
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
