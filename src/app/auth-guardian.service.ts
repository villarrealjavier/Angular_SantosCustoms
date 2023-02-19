import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuardian implements CanActivate, CanActivateChild{

    constructor(private router:Router, private servicio: AuthService){};

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        
        if (this.servicio.isAuthenticated()){
          return true;
        } else {
          this.router.navigate(['/']);
        }
        return false;
        
    
      }
    
      canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
       
        if (this.servicio.isAuthenticated()){
          return true;
        } else {
          this.router.navigate(['/']);
        }
        return false;
        
    
      }
   
}
