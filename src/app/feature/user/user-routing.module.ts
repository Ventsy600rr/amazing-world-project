import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from 'src/app/shared/guards/authentication.guard';
import { CreatorComponent } from './creator/creator.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
     canActivate: [AuthenticationGuard],
  },
  {
    path: ':creatorId/creator',
    component: CreatorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
