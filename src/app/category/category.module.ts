import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';
import { DeleteComponent } from './delete/delete.component';
import { CarsRoutingModule } from '../cars/cars-routing.module';



@NgModule({
  declarations: [
    AddComponent,
    UpdateComponent,
    ListComponent,
    DeleteComponent,
    
  ],
  imports: [
    CommonModule,
    CarsRoutingModule
  ],exports:[
    AddComponent,
    UpdateComponent,
    ListComponent,
    DeleteComponent,
    CarsRoutingModule
  ]
})
export class CategoryModule { }
