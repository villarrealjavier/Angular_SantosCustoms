import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exemplary } from 'src/app/interfaces/exemplary.interface';
import { environment } from '../../../environments/environment';
import { brand } from '../../interfaces/brand.interface';

@Injectable({
  providedIn: 'root'
})
export class ExemplaryService {

  constructor(private http:HttpClient) { }

  getExemplaries():Observable<exemplary[]>{
    return this.http.get<any>(environment.urlApi+"Models")

  }
  updateExemplary(name_exemplary:string,name_brand:brand):Observable<any>{
    return this.http.put<any>(environment.urlApi+"Models/"+name_exemplary,{"name_exemplary":name_exemplary,"name_brand":name_brand})
  }
  deleteExemplary(name_exemplary:string):Observable<exemplary> {
    return this.http.delete<any>(environment.urlApi+"Models/"+name_exemplary)

  }
  getExemplaryById(name_exemplary:string):Observable<exemplary> {
    return this.http.get<any>(environment.urlApi+"Models/"+name_exemplary)

  }
  saveExemplary(name_exemplary:string,name_brand:brand):Observable<any>{
    return this.http.post<any>(environment.urlApi+"Models",{"name_exemplary":name_exemplary,"name_brand":name_brand})
    
  }
}
