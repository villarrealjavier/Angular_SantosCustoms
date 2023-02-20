import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class VerifyService {

  constructor(private http:HttpClient,private route:ActivatedRoute) { }

  verify(code:string,username:string):Observable<any>{
     return this.http.get<any>(environment.urlApi+`verify?code=${code}&username=${username}`)
    
  }
      

  }
  

