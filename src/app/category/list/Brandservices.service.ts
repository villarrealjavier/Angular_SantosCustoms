import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { brand } from 'src/app/interfaces/brand.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http:HttpClient) { }

  private url:string='http:8080//localhost/brand'

  getBrands():Observable<brand[]>{
    
    return this.http.get<brand[]>(`${this.url}`)

  }


}
