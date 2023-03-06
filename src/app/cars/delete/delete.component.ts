import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CarsService } from '../cars.service';
import { cars } from '../../interfaces/cars.interface copy';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  car!:cars
 sold!:boolean;

  constructor( private router:Router, 
    private carService:CarsService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id =this.route.snapshot.params["id"]
    this.carService.getCarsbyId(id).subscribe({
      next:(resp)=>{
        this.car=resp
        this.sold=resp.sold
        console.log(this.car.sold)
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
  }

  deleteCar(){
    this.carService.deleteCars(this.car.num_bastidor).subscribe({
      next:(resp)=>{
        Swal.fire({
          icon: 'success',
          title: 'El coche ha sido eliminado con éxito!',
          text: 'Estas de vuelta en el listado!',
      });
      this.router.navigate(['/cars/listCar'])
      },error:(e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error al eliminar!',
          
        })
      }
    })
  }

}
