import { Component, OnInit } from '@angular/core';
import { exemplary } from '../../interfaces/exemplary.interface';
import { CarsService } from '../cars.service';
import { ExemplaryService } from '../../exemplary/services/exemplary.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { cars } from '../../interfaces/cars.interface copy';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  dateDay = new Date().getFullYear();
  car!:cars
  exemplaries:exemplary[]= []
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';

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

  constructor(private exemplaryService:ExemplaryService, private router:Router, 
    private carService:CarsService,private fb:FormBuilder,private route:ActivatedRoute) { }

    ngOnInit(): void {
      const id =this.route.snapshot.params["id"]
      this.carService.getCarsbyId(id).subscribe({
        next:(resp)=>{
          this.car=resp
          console.log(this.car)

        },error:(e)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se ha podido obtener la marca!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
        }
      })
      this.getExemplaries()
     
    }

  addCarForm: FormGroup = this.fb.group({
  
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
  getExemplaries(){
    this.exemplaryService.getExemplaries().subscribe({
      next:(resp)=>{
        this.exemplaries=resp
      },error:(e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al obtener los modelos!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
    })
  }

  updateCar(){
    this.json.num_bastidor=this.car.num_bastidor
  this.json.year=this.addCarForm.get('year')?.value
  this.json.color=this.addCarForm.get('color')?.value
  this.json.hp=this.addCarForm.get('hp')?.value
  this.json.cubic_cent=this.addCarForm.get('cubic_cent')?.value
  this.json.sold=this.addCarForm.get('sold')?.value
  this.json.price=this.addCarForm.get('price')?.value

  console.log(this.addCarForm.get('fileSource')?.value)

  this.exemplaryService.getExemplaryById(this.addCarForm.get('name_exemplary')?.value).subscribe({
    next:(resp)=>{
      this.json.name_exemplary=resp
      
      this.carService.updateCars(this.addCarForm.get('fileSource')?.value, this.json,this.car.num_bastidor).subscribe({
        next:(resp)=>{
         window.location.reload()
         this.addCarForm.reset()
        },error:(e)=>{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ha ocurrido un error al actualizar!',
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


  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.verSeleccion = this.opcionSeleccionado;
    
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
