import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { brand } from 'src/app/interfaces/brand.interface';
import { Observable, switchMap, of, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }
  token:any=localStorage.getItem('Authorization');;
  

  /*httpOptions={
    headers: new HttpHeaders({'Authorization':this.token})
    headers: new HttpHeaders({'Access-Control-Allow-Origin':'*',
    'Authorization':this.token,"Access-Control-Allow-Methods": "OPTIONS,POST,GET",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age":"3600"
})
  }*/
  deleteBrand(name_brand:string):Observable<brand>{
    
    return this.http.delete<brand>(environment.urlApi+"brand/"+name_brand)

  }

  

  saveBrand(name_brand:string,country:string):Observable<boolean>{
   
   
    
    
    return this.http.post<any>(environment.urlApi+"brand",{'name_brand':name_brand,'country':country})
    .pipe(switchMap(resp=>{
    

      return of(true);
    
  }),catchError(error=>{
    Swal.fire({
      icon: 'error',
      title: 'Marca existente!',
      text: 'No puedes introducir una marca con ese nombre!',
      
    })
    return of(false)
  }))
  }
  getBrandbyId(id:string):Observable<brand>{
    
    return this.http.get<brand>(environment.urlApi+"brand/"+id)

  }

  updateBrand(name_brand:string,country:string):Observable<boolean>{
    return this.http.put<any>(environment.urlApi+"brand/"+name_brand,{'country':country})
    .pipe(switchMap(resp=>{
    
      return of(true);
    
  }),catchError(error=>{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No tienes permisos!',
    })
    return of(false)
  }))
  }

  

  getBrands():Observable<brand[]>{
    return this.http.get<brand[]>(environment.urlApi+"brand")
  }


}
