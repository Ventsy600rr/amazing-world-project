import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreatorComponent } from './creator/creator.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent, CreatorComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, SharedModule],
  exports: [UserRoutingModule],
})
export class UserModule {}
