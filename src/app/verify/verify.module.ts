import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyComponent } from './verify.component';
import { RouterModule } from '@angular/router';
import { verifyRoutingModule } from './verify-routing.module';



@NgModule({
  declarations: [
    VerifyComponent
  ],
  imports: [
    CommonModule,
    verifyRoutingModule
  ],exports:[
    VerifyComponent
  ]
})
export class VerifyModule { }
