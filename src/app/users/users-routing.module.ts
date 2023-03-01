import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { RolGuardGuard } from '../rol-guard.guard';

const routes: Routes = [
  {
    path: '',
    children:[
      
      {
        path: 'deleteUsers/:id',
        component: DeleteComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'listUsers',
        component: ListComponent,
        canActivate:[RolGuardGuard]
    
      },
      {
        path: 'updateUsers/:id',
        component: UpdateComponent,
        
    
      },
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class usersRoutingModule { }
