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
  listUsers:user[]=[]
  usernameActual:string|null=localStorage.getItem("username");

  constructor(private service:UsersService, private AuthService:AuthService){

  }


  ngOnInit(){
    this.service.getUsers().subscribe({
      next:(resp=>{
        this.listUsers=resp
        

      })
    })
}
}
