import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';


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
      console.log(resp)
      localStorage.setItem('Authorization',resp)
      localStorage.setItem('loggin',"true");
      return of(true);
    
  }),catchError(error=>{
    localStorage.setItem('loggin',"false");
    localStorage.removeItem("Authorization");
    
    return of(false)
  }))
  }

}
