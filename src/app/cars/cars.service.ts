import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { cars } from '../interfaces/cars.interface copy';

@Injectable({
  providedIn: 'root'
})
export class CarsService {

  constructor(private http: HttpClient) { }

  getCars():Observable<cars[]>{
    
    return this.http.get<cars[]>(environment.urlApi+"Cars")

  }

  getCarsbyId(id:string):Observable<cars>{
    
    return this.http.get<cars>(environment.urlApi+"Cars/"+id)

  }

  getCarsbyBrand(brand:string):Observable<cars[]>{
    
    return this.http.get<cars[]>(environment.urlApi+"CarsbyBrand/"+brand)

  }

  addCars(file:File, json:any):Observable<cars>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('car', new Blob([JSON.stringify(json)], {type: 'application/json'}));
    return this.http.post<cars>(environment.urlApi+"Cars", formData)

   }
   updateCars(file:File, json:any, num_bastidor:string):Observable<cars>{
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('car', new Blob([JSON.stringify(json)], {type: 'application/json'}));
    return this.http.put<cars>(environment.urlApi+"Cars/"+num_bastidor, formData)

   }
}
