import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  {
    path: '',
    children:[
      {
        path: 'addCategory',
        component: AddComponent,
    
      },
      {
        path: 'deleteCategory/:id',
        component: DeleteComponent,
    
      },
      {
        path: 'listCategory',
        component: ListComponent,
    
      },
      {
        path: 'updateCategory/:id',
        component: UpdateComponent,
    
      },
    ]

  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
