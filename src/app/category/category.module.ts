import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CategoryRoutingModule } from './category-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DeleteComponent,
    AddComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    SharedModule
    
  ],exports:[
    DeleteComponent,
    AddComponent,
    ListComponent,
    UpdateComponent,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
