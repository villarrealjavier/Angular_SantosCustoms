import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';

import { RolGuardGuard } from '../rol-guard.guard';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: '',
        component: ShoppingCartComponent,
    
      },
     
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
