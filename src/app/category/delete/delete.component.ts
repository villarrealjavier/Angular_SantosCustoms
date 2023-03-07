import { Component, OnInit } from '@angular/core';
import { BrandService } from '../list/Brandservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  name_brand!:string; //Nombre de la marca
  country!:string //Pais de la marca

  //Implementamos el servicio de marca, activatedrouter para recoger los parámetros y router
  constructor(private service: BrandService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.name_brand=this.route.snapshot.params["id"] //Recogemos el id de la marca
    this.service.getBrandbyId(this.name_brand).subscribe({ //Buscamos la marca por el id, y asignamos el pais a la variable
      next: (resp) => {
        this.country=resp.country
        
      }
    })
  }

  //Método para eliminar una marca
  deleteBrand(){
    this.service.deleteBrand(this.name_brand).subscribe({ //Realizamos la peticion llamando al servicio
      next:(resp)=>{
        if(resp){ //Si obtenemos una respuesta, enviamos mensaje con el mensaje de éxito
          
          Swal.fire({
            icon: 'success',
            title: 'La marca ha sido eliminada con éxito!',
            text: 'Estas de vuelta en el listado!',
        });
        this.router.navigate(['/category/listCategory'])

      }else { //Si no obtenemos respuesta, mandamos mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes permisos!',
        })
        
        
      }
        
  }
})

  }
}
