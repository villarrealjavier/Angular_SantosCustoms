import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../list/Brandservices.service';
import { brand } from '../../interfaces/brand.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private fb: FormBuilder, private router:Router, private service:BrandService, private route: ActivatedRoute) { }
  myForm: FormGroup = this.fb.group({
    name_brand:['',[Validators.required, Validators.minLength(3)]],
    country:['',[Validators.required, Validators.minLength(3)]],
  })
  id!:string;
  

  

 
  ngOnInit(): void {
    this.myForm.controls['name_brand'].setValue(this.route.snapshot.params["id"])
    
  }
  isValidField(field:string){
    return this.myForm?.controls[field].errors
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }

  updateBrand(){
    console.log(this.myForm.controls['country'].value)
    this.service.updateBrand(this.myForm.controls['name_brand'].value,this.myForm.controls['country'].value).subscribe({
      next: (resp) => {
       
          console.log(resp)
          if(resp){
          
            Swal.fire({
              icon: 'success',
              title: 'La marca ha sido editada con éxito!',
              text: 'Estas de vuelta en el listado!',
          });
          this.router.navigate(['/category/listCategory'])

        }else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No tienes permisos!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          
          
        }}})
     }

  }


