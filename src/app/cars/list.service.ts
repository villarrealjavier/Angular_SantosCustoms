import { Injectable } from '@angular/core';
import { cars } from '../interfaces/cars.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getCars():Observable<cars[]>{
    
    return this.http.get<cars[]>(environment.urlApi+"Cars")

  }
}
