import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { CarsRoutingModule } from '../cars/cars-routing.module';
import { CategoryRoutingModule } from './cars-routing.module';



@NgModule({
  declarations: [
    AddComponent,
    UpdateComponent,
    ListComponent,
    DeleteComponent,
    
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ],exports:[
    AddComponent,
    UpdateComponent,
    ListComponent,
    DeleteComponent,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
