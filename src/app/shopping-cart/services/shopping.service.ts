import { Injectable } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private http: HttpClient) { }

 shoppingCart:cars[]=[]

 Purchase(listCars:cars[], username:any):Observable<cars[]>{
  const formData = new FormData();
  formData.append('numbers_bast', new Blob([JSON.stringify(listCars)], {type: 'application/json'}), 'numbers_bast');
  formData.append('user',  new Blob([JSON.stringify(username)], {type: 'application/json'}));
  

  return this.http.post<any>(`${environment.urlApi}Purchase`,formData)
}


  

}
