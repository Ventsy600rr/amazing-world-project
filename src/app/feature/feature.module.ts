import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlacesModule } from './places/places.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [PlacesModule, UserModule],
})
export class FeatureModule {}
