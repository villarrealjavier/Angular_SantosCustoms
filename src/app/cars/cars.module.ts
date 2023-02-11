import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteComponent } from './delete/delete.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { CarsRoutingModule } from './cars-routing.module';



@NgModule({
  declarations: [
    DeleteComponent,
    AddComponent,
    ListComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    CarsRoutingModule,
  ],exports:[
    DeleteComponent,
    AddComponent,
    ListComponent,
    UpdateComponent,
    CarsRoutingModule
  ]
})
export class CarsModule { }
