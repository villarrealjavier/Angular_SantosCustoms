import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from 'src/app/interfaces/user.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http:HttpClient) { }


  getUser(id:string):Observable<user>{
    return this.http.get<any>(`${environment.urlApi}users/${id}`)
  }
  getUsers():Observable<user[]>{
    return this.http.get<any>(`${environment.urlApi}users`)
  }

  updateUser(json: any, file: File, username:string):Observable<user>{
    const formData = new FormData();
  
    formData.append('file', file, file.name);
    formData.append('user', new Blob([JSON.stringify(json)], {type: 'application/json'}));
 
    return this.http.put<any>(`${environment.urlApi}users/${username}`,formData)
  }
  deleteUsers(username:string):Observable<user[]>{
    return this.http.delete<any>(`${environment.urlApi}users/${username}`)
  }

}
