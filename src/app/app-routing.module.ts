import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

import { NotFoundComponent } from './not-found/not-found.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent
},
  {
    path: 'cars',
    loadChildren: () => import('./cars/cars.module').then(m => m.CarsModule)
   
  },
  {
  path: 'category',
  loadChildren: () => import('./category/category.module').then(m => m.CategoryModule)
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
