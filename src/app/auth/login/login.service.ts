import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  httpOptions={
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private http:HttpClient) { }

  login(username:string,password:string):Observable<boolean>{
    console.log(username,password)
    
    return this.http.post<any>(environment.urlApi+"signin",{'username':username,'password':password}, this.httpOptions)
    .pipe(switchMap(resp=>{
      //  let indice = resp.indexOf(" ");
      // console.log(resp.token.substring(indice, resp.token.length))

      localStorage.setItem('Authorization',resp.token)
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

}
