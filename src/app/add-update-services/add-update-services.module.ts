import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateServicesPageRoutingModule } from './add-update-services-routing.module';

import { AddUpdateServicesPage } from './add-update-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddUpdateServicesPageRoutingModule
  ],
  declarations: [AddUpdateServicesPage]
})
export class AddUpdateServicesPageModule {}
