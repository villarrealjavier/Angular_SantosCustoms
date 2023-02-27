import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandService } from '../../category/list/Brandservices.service';
import { brand } from '../../interfaces/brand.interface';
import { ExemplaryService } from '../services/exemplary.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
  ]
})
export class AddComponent {
  constructor(private fb: FormBuilder, private router:Router, private brandService:BrandService, private exemplaryService:ExemplaryService ) { }
  brand!:brand
  brands:brand[]=[]
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  name_exemplary:string=''

  ngOnInit(): void {
    this.getBrands()
  }

  @ViewChild('formLogin') formLogin!: NgForm

  validateExemplary(): boolean{
    this.name_exemplary = this.formLogin?.controls['name_exemplary'].value;
    
    return this.formLogin?.controls['name_exemplary'].invalid
    && this.formLogin?.controls['name_exemplary'].touched;

  }

  
 
  saveExemplary(){
    this.brandService.getBrandbyId(this.verSeleccion).subscribe({
      next:(resp=>{
        this.brand=resp
        return this.exemplaryService.saveExemplary(this.name_exemplary,this.brand).subscribe({
          next:(resp)=>{
            if(resp){
              Swal.fire({
                icon: 'success',
                title: 'El modelo ha sido añadido con éxito!',
                text: 'Estas de vuelta en el listado!',
            });
            this.router.navigate(['/exemplary/listExemplary'])
              
            }
          },
          error: (e)=>{
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Esa marca ya existe!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
          }
        })
      })
    })
    

  }
  getBrands(){

    this.brandService.getBrands().subscribe({
      next:(resp=>{
        this.brands=resp

      })
    })
  }
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
}

}
