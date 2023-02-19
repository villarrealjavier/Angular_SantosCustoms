import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuardian } from './auth-guardian.service';




const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
},
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule),canActivate:[AuthGuardian]
   
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(m => m.CategoryModule),canActivate:[AuthGuardian]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
        path: '**',
        component: NotFoundComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
