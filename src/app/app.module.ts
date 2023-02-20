import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CarsModule } from './cars/cars.module';

import { NotFoundComponent } from './not-found/not-found.component';
import { CategoryModule } from './category/category.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { AuthService } from './auth/auth.service';
import { AuthGuardian } from './auth-guardian.service';
import { VerifyComponent } from './verify/verify.component';
import { VerifyModule } from './verify/verify.module';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    RouterModule,
    CarsModule,
    CategoryModule,
    HttpClientModule,
    HomeModule,
    VerifyModule
  ],
  providers: [AuthService, AuthGuardian],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
