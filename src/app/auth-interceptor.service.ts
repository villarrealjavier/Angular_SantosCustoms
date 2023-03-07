import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError  } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(  private router: Router) { 
    
  }

//Metodo para añadir el token en las peticiones
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt: string|null = localStorage.getItem('Authorization'); //Recoge el token
    
    let request = req;
    
    if (jwt) {
      request = req.clone({
        setHeaders: {
          Authorization: jwt //Añade la cabecera

        }
      });
    }

    return next.handle(request).pipe( //Si da error, te lleva a la página principal
    catchError((err: HttpErrorResponse) => {

      if (err.status === 401) {
        this.router.navigateByUrl('/');
      }

      return throwError( err );

    })
  );
  }
}