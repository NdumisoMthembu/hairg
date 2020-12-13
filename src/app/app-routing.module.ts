import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'list-services',
    loadChildren: () => import('./list-services/list-services.module').then( m => m.ListServicesPageModule)
  },
  {
    path: 'add-update-services',
    loadChildren: () => import('./add-update-services/add-update-services.module').then( m => m.AddUpdateServicesPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}