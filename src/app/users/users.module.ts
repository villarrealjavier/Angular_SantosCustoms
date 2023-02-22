import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { usersRoutingModule } from './users-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ListComponent,
    UpdateComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    usersRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],exports:[
    ListComponent,
    UpdateComponent,
    DeleteComponent
  ]
})
export class UsersModule { }
