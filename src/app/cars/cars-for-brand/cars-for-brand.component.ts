import { Component } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../list.service';

@Component({
  selector: 'app-cars-for-brand',
  templateUrl: './cars-for-brand.component.html',
  styles: [
  ]
})
export class CarsForBrandComponent {

  carsbyBrand:cars[]=[]

  constructor(private route:ActivatedRoute,private service:ListService){

  }
  ngOnInit(){
    const id = this.route.snapshot.params["id"]
    this.service.getCarsbyBrand(id).subscribe({
      next:(resp=>{
        this.carsbyBrand=resp;
        console.log(this.carsbyBrand)
      })
    })
  }
}
