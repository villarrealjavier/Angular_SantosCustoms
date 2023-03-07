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

  //Implementamos el servicio de usuarios, activatedRouter para recoger los parámetros, formbuildeer y router
  constructor(private service:UsersService, private route:ActivatedRoute,private fb:FormBuilder,private router:Router){

  }
  user!:user // Usuario

  ngOnInit(){
    const id = this.route.snapshot.params["id"] //Recogemos el usuario actual
    this.service.getUser(id).subscribe({ //Realizamos la peticion de busqueda del usuario mediante el id
      next:(resp=>{
        this.user=resp
      })
    })
  }
  //Método para eliminar un usuario
  deleteUser(){
    this.service.deleteUsers(this.user.username).subscribe({ //Realizamos la peticion llamando al servicio
      next:(resp=>{ //Si no tiene error, mandamos mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'El usuario ha sido eliminado con éxito!',
          text: 'Estas de vuelta en el listado!',
      });
      this.router.navigate(['/users/listUsers']) //Redirigimos a la lista de usuarios

      }), error:(e)=>{ //Si capta un error, lanza mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido al eliminar el usuario!',
          
        })
      }
    })
  }
}
