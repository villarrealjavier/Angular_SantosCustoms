import { Component } from '@angular/core';
import { user } from 'src/app/interfaces/user.interface';
import { UsersService } from '../services/users.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
  
})
export class ListComponent {
  listUsers:user[]=[] //Listado de usuarios
  usernameActual:string|null=localStorage.getItem("username"); //Username del usuario

  //Implementamos el servicio de usuarios, y el authService
  constructor(private service:UsersService, private AuthService:AuthService){

  }


  ngOnInit(){
    this.service.getUsers().subscribe({ //Obtenemos todos los usuarios y se los asignamos a la lista
      next:(resp=>{
        this.listUsers=resp
        

      })
    })
}
}
