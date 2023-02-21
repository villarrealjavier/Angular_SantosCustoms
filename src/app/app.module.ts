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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { AuthService } from './auth/auth.service';
import { AuthGuardian } from './auth-guardian.service';
import { VerifyModule } from './verify/verify.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RolGuardGuard } from './rol-guard.guard';
import { AuthInterceptorService } from './auth-interceptor.service';




@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    
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
    VerifyModule,
    BrowserAnimationsModule

 
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  },AuthService, AuthGuardian, RolGuardGuard],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
