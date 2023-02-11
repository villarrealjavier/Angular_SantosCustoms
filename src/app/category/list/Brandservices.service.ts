import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { brand } from 'src/app/interfaces/brand.interface';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  

  getBrands():Observable<brand[]>{
    
    return this.http.get<brand[]>(environment.urlApi+"brand")

  }


}
