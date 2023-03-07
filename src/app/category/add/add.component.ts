import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { BrandService } from '../list/Brandservices.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  //Implementacion de formbuilder para la validacion, router y servicio de marcas
  constructor(private fb: FormBuilder, private router:Router, private service:BrandService) { }

  ngOnInit(): void {
  }

  //Formulario reactivo el cual posee las restricciones para cada campo
  myForm: FormGroup = this.fb.group({
    name_brand:['',[Validators.required, Validators.minLength(3)]],
    country:['',[Validators.required, Validators.minLength(3)]],
  })

  

  //Validacion para los campos
  isValidField(field:string){
    return this.myForm?.controls[field].errors //Se comprueba si tiene errores, si es inválido y si han sido modificados
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }
 

 

  //Método para guardar una marca
  saveBrand(){
    //Asignamos los valores del formulario a las variables
    const name_brand:string =this.myForm.get('name_brand')?.value
    const country:string = this.myForm.get('country')?.value
    
  
    this.service.saveBrand(name_brand,country
    ).subscribe({ //Realizamos la peticion
        next: (resp) => {
         if(resp){ //Comprobamos que tenemos una respuesta, y si la tenemos, mandamos mensaje informando
           if(this.myForm.valid){
           
             Swal.fire({
               icon: 'success',
               title: 'La marca ha sido añadida con éxito!',
               text: 'Estas de vuelta en el listado!',
           });
           this.router.navigate(['/category/listCategory']) //Redirigimos a la lista de categorias

         }else { //Si no obtenemos respuesta mandamos mensaje de error
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Algo debe haber salido mal!',
           })
           
           
         }
        }else{ //Si no obtenemos respuesta mandamos mensaje de error
          Swal.fire({
            icon: 'error',
            title: 'Marca existente!',
            text: 'No puedes introducir una marca con ese nombre!',
            
          })
         }}})

         }
       }
  

