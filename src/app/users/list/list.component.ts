import { Component } from '@angular/core';
import { user } from 'src/app/interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent {
  listUsers:user[]=[]

  constructor(private service:UsersService){

  }

  getUsers(){
    this.service.getUsers().subscribe({
      next:(resp=>{
        this.listUsers=resp

      })
    })
}
}
