import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { user } from '../../interfaces/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent {

  constructor(private service:UsersService, private route:ActivatedRoute,private fb:FormBuilder,private router:Router){

  }
  user!:user
  ngOnInit(){
    const id = this.route.snapshot.params["id"]
    this.service.getUser(id).subscribe({
      next:(resp=>{
        this.user=resp
      })
    })
  }
  deleteUser(){
    this.service.deleteUsers(this.user.username).subscribe({
      next:(resp=>{
        Swal.fire({
          icon: 'success',
          title: 'El usuario ha sido eliminado con éxito!',
          text: 'Estas de vuelta en el listado!',
      });
      this.router.navigate(['/users/listUsers'])

      })
    })
  }
}
