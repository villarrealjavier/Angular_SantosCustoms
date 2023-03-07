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

  role:string | null=localStorage.getItem("role") //Obtenemos el rol del localStorage para determinar su vista en el html
  cars:cars[]=[] // Lista de coches para obtener sus coches
  carsRespaldo:cars[]=[] //Almacenaremos nuevamente los coches para utilizarlo en el filtrado
  totalRecords!:number; // Numero total del items

  ngOnInit(): void {
    this.service.getCars().subscribe({ //Obtenemos todos los coches y asigamos a ambas listas la respuesta
      next: (resp=>{
        this.cars=resp
        this.carsRespaldo=resp
      }) 
    })

    this.totalRecords=this.cars.length // Le asignamos el total de coches a la variable

  }

  filtroNombre!: string; //Variable por la que se filtrará

  //Método para el filtrado
  filtrar() {
   //Buscamos por el filtro si este no está vacio
    if(this.filtroNombre.trim().length!=0){
      this.cars = this.cars.filter(dato => dato.name_exemplary.name_exemplary.toLowerCase().includes(this.filtroNombre.toLowerCase()));
      
    }else{
      this.cars=this.carsRespaldo //Si esta vacio devolvemos toda la lista
    }
  }

  //Añadir a la bolsa de la compra
  addShoppingCart(car:cars){ // Recibirá un coche
    let encontrado=false; // Variable que usaremos para asegurarnos de que el coche no esta ya en el carrito
    for(let item of this.shoppingService.shoppingCart){ // Recorremos la lista de la compra
      if(item.num_bastidor==car.num_bastidor){ //Comprobamos que no haya un coche con el mismo identificador
        encontrado=true; //Si lo hay ponemos la variable a true
      }
    }
    if(encontrado==false){ //Si por el contrario no lo hay, añadimos el coche al carrito y actualizamos la lista del sessionStorage
      this.shoppingService.shoppingCart.push(car)
      window.sessionStorage.setItem('carrito', JSON.stringify(this.shoppingService.shoppingCart));
      


    }
  }
  


}
