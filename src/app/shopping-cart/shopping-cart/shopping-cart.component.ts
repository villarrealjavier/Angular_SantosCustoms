import { Component } from '@angular/core';
import { cars } from '../../interfaces/cars.interface copy';
import { ShoppingService } from '../services/shopping.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsersService } from '../../users/services/users.service';
import { user } from '../../interfaces/user.interface';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent {

  listShoppingCart:cars[] =[] //Listado de coches, los cuales estarán en el carrito
  total!:number; // Precio total
  usernameActual!:string //username actual
  json: any = { //Json 
    username:'',
    name: '',
    password: '',
    email:''
  };

//Implemetamos el servicio de carrito, router, y servicio de usuarios
  constructor(private service: ShoppingService, private router:Router,private userService:UsersService){


  }

  ngOnInit(){
   
    let username= localStorage.getItem('username') //Obtenemos el username del localStorage
   
   if(username!=null){
    this.usernameActual=username //Le asignamos el valor a la variable
    this.getCart() // Obtenemos el carrito
    
  }
  
    this.total=this.getTotal() //Asignamos el total a la variable

  }

  //Método para obtener el carrito del sessionStorage
  getCart() {
    const carrito = window.sessionStorage.getItem('carrito');
    if (carrito) {
      this.listShoppingCart = JSON.parse(carrito);
    }
  }

  //Método para eliminar un item del carrito
  deleteItem(index:number){
    this.total= this.total-this.listShoppingCart[index].price //Elimina el precio del total antes eliminar el articulo
   
    this.listShoppingCart.splice(index,1) //Elimina de la lista mostrada el item
    this.service.shoppingCart.splice(index,1)//Elimina de la lista del servicio el item
    
    window.sessionStorage.setItem('carrito', JSON.stringify(this.listShoppingCart)); //Actualizamos el carrito

  }

  //Método para vaciar el carrito
  vaciarCarrito(){
    this.listShoppingCart=[] //Ponemos el carrito a una lista vacia
    this.service.shoppingCart=[]//Ponemos el carrito a una lista vacia
    window.sessionStorage.setItem('carrito', JSON.stringify(this.listShoppingCart));//Actualizamos el carrito


  }

 

  //Método para obtener el precio total de los items
  getTotal() {
    let totalCompra=0
    for (const car of this.listShoppingCart) { //Recorre los items y suma el precio a la variable total
      totalCompra=totalCompra + car.price
    
      
    }
    
    return totalCompra

  
  }
  //Método para guardar la compra
  Purchase(){
    this.service.Purchase(this.listShoppingCart,this.usernameActual).subscribe({ //Realizamos la peticion llamando al servicio
      next:(resp)=>{ //Si no existen errores, devolvemos el mensaje de éxito
        
        Swal.fire({
          icon: 'success',
          title: 'Gracias por su compra!',
          text: 'Estas de vuelta en el listado!',
      });
       this.router.navigate(['/cars/listCar']) //Redirigimos a la lista de coches
       this.vaciarCarrito(); //Vaciamos el carrito
       this.total=0 //Ponemos el total a cero


       
      },error:(e)=>{ //Si existe algun error, devolvemos el mensaje de error
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido al tratar de realizar la compra!',
        })

      }
    })
  }
  

}
