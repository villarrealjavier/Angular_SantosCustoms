import { Component, OnInit } from '@angular/core';
import { CarsService } from '../cars.service';
import { cars } from '../../interfaces/cars.interface copy';
import { ShoppingService } from '../../shopping-cart/services/shopping.service';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service:CarsService,private shoppingService:ShoppingService) { }

  role:string | null=localStorage.getItem("role") 
  cars:cars[]=[]
  carsRespaldo:cars[]=[]
  totalRecords!:number;

  ngOnInit(): void {
    this.service.getCars().subscribe({
      next: (resp=>{
        this.cars=resp
        this.carsRespaldo=resp
      }) 
    })

    this.totalRecords=this.cars.length

  }
  filtroNombre!: string;

  filtrar() {
   
    if(this.filtroNombre.trim().length!=0){
      this.cars = this.cars.filter(dato => dato.name_exemplary.name_exemplary.toLowerCase().includes(this.filtroNombre.toLowerCase()));
      
    }else{
      this.cars=this.carsRespaldo
    }
  }
  addShoppingCart(num_bastidor:string){
    let encontrado=false;
    for(let item of this.shoppingService.shoppingCart){
      if(item==num_bastidor){
        encontrado=true;
      }
    }
    if(encontrado==false){
      this.shoppingService.shoppingCart.push(num_bastidor)
      console.log(this.shoppingService.shoppingCart)

    }
  }
  


}
