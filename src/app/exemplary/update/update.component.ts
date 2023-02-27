import { Component } from '@angular/core';
import { BrandService } from '../../category/list/Brandservices.service';
import { brand } from '../../interfaces/brand.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { ExemplaryService } from '../services/exemplary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: [
  ]
})
export class UpdateComponent {
  brands:brand[]=[]
  name_exemplary!:string;
  brand!:brand
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

  constructor(private brandService:BrandService, private route:ActivatedRoute, private exemplaryService:ExemplaryService,private router:Router){

  }
  ngOnInit(){
    this.name_exemplary=this.route.snapshot.params["id"]
    this.getBrands()
    
    

  }

  getBrands(){

    this.brandService.getBrands().subscribe({
      next:(resp=>{
        this.brands=resp

      })
    })
  }
  updateExemplary(){
    this.brandService.getBrandbyId(this.verSeleccion).subscribe({
      next:(resp=>{
        this.brand=resp
        return this.exemplaryService.updateExemplary(this.name_exemplary,this.brand).subscribe({
          next:(resp=>{
            if(resp){
              Swal.fire({
                icon: 'success',
                title: 'El modelo ha sido editado con éxito!',
                text: 'Estas de vuelta en el listado!',
            });
            this.router.navigate(['/exemplary/listExemplary'])
              
            }else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo debe haber salido mal!',
                footer: '<a href="">Why do I have this issue?</a>'
              })
              
              
            }
          })
        })
      })
    })
    

  }
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
}

}
