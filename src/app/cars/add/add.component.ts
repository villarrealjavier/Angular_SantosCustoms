import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';
import { brand } from 'src/app/interfaces/brand.interface';
import { ExemplaryService } from '../../exemplary/services/exemplary.service';
import { exemplary } from '../../interfaces/exemplary.interface';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

 dateDay = new Date().getFullYear();
  exemplaries:exemplary[]= []
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  constructor(private exemplaryService:ExemplaryService, private router:Router, 
    private carService:CarsService,private fb:FormBuilder) { }


  json: any = {
    num_bastidor:'',
    year: '',
    hp: '',
    color:'',
    cubic_cent:'',
    name_exemplary:'',
    sold:'',
    price:'',

  };


  addCarForm: FormGroup = this.fb.group({
    num_bastidor:['',[Validators.required, Validators.minLength(11),Validators.maxLength(12)]],
    year:['',[Validators.required, Validators.min(1970), Validators.max(this.dateDay)]],
    hp:['',[Validators.required,Validators.min(50), Validators.max(1000)]],
    color:['',[Validators.required,Validators.minLength(3)]],
    cubic_cent:['',[Validators.required, Validators.min(1000), Validators.max(9000)]],
    name_exemplary:['',[Validators.required]],
    sold:['false',[Validators.required]],
    file:['',[Validators.required]],
    price:['',[Validators.required, Validators.min(1), Validators.max(5000000)]],
    fileSource:['',[Validators.required]]
    






    
  })
  isValidField(field:string){
    return this.addCarForm?.controls[field].errors
    && this.addCarForm?.controls[field].invalid && this.addCarForm.controls[field].touched
  }


  ngOnInit(): void {
    this.getExemplaries()
   
  }

  getExemplaries(){
    this.exemplaryService.getExemplaries().subscribe({
      next:(resp)=>{
        this.exemplaries=resp
      }
    })
  }


  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
}

addCar(){
  this.json.num_bastidor=this.addCarForm.get('num_bastidor')?.value
  this.json.year=this.addCarForm.get('year')?.value
  this.json.color=this.addCarForm.get('color')?.value
  this.json.hp=this.addCarForm.get('hp')?.value
  this.json.cubic_cent=this.addCarForm.get('cubic_cent')?.value
  this.json.sold=this.addCarForm.get('sold')?.value
  this.json.price=this.addCarForm.get('price')?.value

  console.log(this.json.name_exemplary)

  this.exemplaryService.getExemplaryById(this.addCarForm.get('name_exemplary')?.value).subscribe({
    next:(resp)=>{
      this.json.name_exemplary=resp
      this.carService.addCars(this.addCarForm.get('fileSource')?.value, this.json).subscribe({
        next:(resp)=>{
          Swal.fire({
            icon: 'success',
            title: 'El modelo ha sido añadido con éxito!',
            text: 'Estas de vuelta en el listado!',
        });
         this.router.navigate(['/cars/listCar'])
        },error:(e)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al añadir el coche!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      })
    },error:(e)=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ha ocurrido un error al obtener el coche!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }
  })
 

}

onFileChange(event:any) {
   
    
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.addCarForm.patchValue({
      fileSource: file
    });
  }
}



}
