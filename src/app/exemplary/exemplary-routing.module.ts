import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate, CanActivateChild } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { RolGuardGuard } from '../rol-guard.guard';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'addExemplary',
        component: AddComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'deleteExemplary/:id',
        component: DeleteComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'listExemplary',
        component: ListComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'updateExemplary/:id',
        component: UpdateComponent,
        canActivate:[RolGuardGuard]
    
      },
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExemplarRoutingModule { }
