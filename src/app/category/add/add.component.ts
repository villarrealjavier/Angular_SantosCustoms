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

  constructor(private fb: FormBuilder, private router:Router, private service:BrandService) { }

  ngOnInit(): void {
  }

  myForm: FormGroup = this.fb.group({
    name_brand:['',[Validators.required, Validators.minLength(3)]],
    country:['',[Validators.required, Validators.minLength(3)]],
  })

  

  isValidField(field:string){
    return this.myForm?.controls[field].errors
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }
 

 

  saveBrand(){
    const name_brand:string =this.myForm.get('name_brand')?.value
    const country:string = this.myForm.get('country')?.value
    
    console.log(name_brand,country)
    this.service.saveBrand(name_brand,country
    ).subscribe({
        next: (resp) => {
         if(resp){
           if(this.myForm.valid){
           
             Swal.fire({
               icon: 'success',
               title: 'La marca ha sido añadida con éxito!',
               text: 'Estas de vuelta en el listado!',
           });
           this.router.navigate(['/category/listCategory'])

         }else {
           Swal.fire({
             icon: 'error',
             title: 'Oops...',
             text: 'Algo debe haber salido mal!',
             footer: '<a href="">Why do I have this issue?</a>'
           })
           
           
         }
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permisos!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
         }}})

         }
       }
  

