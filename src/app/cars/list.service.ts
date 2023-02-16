import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { cars } from '../interfaces/cars.interface copy';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }

  getCars():Observable<cars[]>{
    
    return this.http.get<cars[]>(environment.urlApi+"Cars")

  }
}
