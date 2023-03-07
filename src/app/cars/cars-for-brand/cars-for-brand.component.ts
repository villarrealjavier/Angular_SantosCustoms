import { Component } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { ActivatedRoute } from '@angular/router';
import {  CarsService } from '../cars.service';

@Component({
  selector: 'app-cars-for-brand',
  templateUrl: './cars-for-brand.component.html',
  styles: [
  ]
})
export class CarsForBrandComponent {

  carsbyBrand:cars[]=[] //Lista de coches

  //Implementamos el activateRouter, para recoger el parametro y el servicio de coches
  constructor(private route:ActivatedRoute,private service:CarsService){

  }
  ngOnInit(){
    const id = this.route.snapshot.params["id"] //Recogemos el id de la marca
    this.service.getCarsbyBrand(id).subscribe({ //Realizamos la peticion y buscamos todos los coches en funcion de la marca
      next:(resp=>{
        this.carsbyBrand=resp;
        
      })
    })
  }
}
