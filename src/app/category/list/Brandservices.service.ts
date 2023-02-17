import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { brand } from 'src/app/interfaces/brand.interface';
import { Observable, switchMap, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }
  token:any=localStorage.getItem('Authorization');;
  

  httpOptions={
    //headers: new HttpHeaders({'Authorization':this.token})
    headers: new HttpHeaders({'Access-Control-Allow-Origin':'*',
    'Authorization':this.token,"Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age":"3600"
})
  }
  

  saveBrand(name_brand:string,country:string):Observable<boolean>{
    console.log(this.token)
    console.log(name_brand,country)
    console.log(this.httpOptions.headers)
    
    
    return this.http.post<any>(environment.urlApi+"addBrand",{'name_brand':name_brand,'country':country}, this.httpOptions )
    .pipe(switchMap(resp=>{
    

      return of(true);
    
  }))
  }
  

  getBrands():Observable<brand[]>{
    
    return this.http.get<brand[]>(environment.urlApi+"brand")

  }


}
