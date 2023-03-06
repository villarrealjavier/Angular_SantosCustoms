import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import jwt_decode from 'jwt-decode';
import { user } from '../interfaces/user.interface';
import { token } from '../interfaces/token.interface';
import { UsersService } from '../users/services/users.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }
  user!:user

  constructor(private http:HttpClient,private service:UsersService) { }

  login(username:string,password:string):Observable<boolean>{
    
    return this.http.post<any>(environment.urlApi+"signin",{'username':username,'password':password}, this.httpOptions)
    .pipe(switchMap(resp=>{
      //  let indice = resp.indexOf(" ");
      // console.log(resp.token.substring(indice, resp.token.length))
      localStorage.setItem('Authorization',resp.token)
      
      const decodedToken :token = jwt_decode(resp.token);
      localStorage.setItem("role", decodedToken.role)
      localStorage.setItem("username", decodedToken.sub)
      localStorage.setItem('loggin',"true");
      return of(true);
    
  }),catchError(error=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    localStorage.setItem('loggin',"false");
    localStorage.removeItem("Authorization");
    
    return of(false)
  }))
  }
  register(username:string,password:string,email:string,name:string):Observable<boolean>{
    console.log(username,password)
    
    return this.http.post<any>(environment.urlApi+"sign_up/submit",{'username':username,'password':password,'email':email,'name':name}, this.httpOptions)
    .pipe(switchMap(resp=>{
    

      return of(true);
    
  }),catchError(error=>{
    Swal.fire({
      icon: 'error',
      title: 'Ha ocurrido un error al registrarse, prueba con otro correo o nombre de usuario',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>'
    })
    
    
    return of(false)
  })
  )
  }
    //Método para comprobar si esta autenticado
    isAuthenticated() {
      return localStorage.getItem('loggin') === 'true'
    }

    isUserAdmin(jwt: string): boolean {
      // Decodifica el token JWT
      const decodedToken :user = jwt_decode(jwt);
    
      // Verifica si el rol del usuario es 'administrador'
      if (decodedToken.role === 'ADMIN') {
        return true;
      } else {
        return false;
      }
    }

    returnUser(jwt: string):any{
      const decodedToken :token = jwt_decode(jwt);
      
      
      if(decodedToken){
        const username=decodedToken.sub
       
        return username;
      }

     
    }
    // returnUserCompleted(jwt: string):any{
    //   const decodedToken :token = jwt_decode(jwt);
      
      
      
    //   if(decodedToken){
        
    //     const username=decodedToken.sub
    //     this.service.getUser(username).subscribe({
    //       next:(resp=>{
    //         this.user=resp
            
    //       })
    //     })
    //     return this.user;
       
    //   }

     
    // }


}
