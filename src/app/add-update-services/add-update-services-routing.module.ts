import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateServicesPage } from './add-update-services.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateServicesPageRoutingModule {}
