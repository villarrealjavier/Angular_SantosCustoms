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

  listShoppingCart:cars[] =[] 
  total!:number;
  user!:user
  json: any = {
    username:'',
    name: '',
    password: '',
    email:''
  };


  constructor(private service: ShoppingService, private router:Router,private userService:UsersService){


  }

  ngOnInit(){
   
    let username= localStorage.getItem('username')
   
   if(username!=null){


  
    this.getCart()
    console.log(username)
    this.userService.getUser(username).subscribe({
      next:(resp)=>{
        
        this.json.username=resp.username
          this.json.name=resp.name
          this.json.password=resp.password
          this.json.email=resp.email
      }
      
    })
  }
  

    
    
    this.total=this.getTotal()

  }

  getCart() {
    const carrito = window.sessionStorage.getItem('carrito');
    if (carrito) {
      this.listShoppingCart = JSON.parse(carrito);
    }
  }
  deleteItem(index:number){
    this.listShoppingCart.splice(index,1)
    this.service.shoppingCart.splice(index,1)
    window.sessionStorage.setItem('carrito', JSON.stringify(this.listShoppingCart));

  }

  vaciarCarrito(){
    this.listShoppingCart=[]
    this.service.shoppingCart=[]
    window.sessionStorage.setItem('carrito', JSON.stringify(this.listShoppingCart));


  }

 

  getTotal() {
    let totalCompra=0
    for (const car of this.listShoppingCart) {
      totalCompra=totalCompra + car.price
    
      
    }
    
    return totalCompra

  
  }
  Purchase(){
    console.log(this.user)
    this.service.Purchase(this.listShoppingCart,this.json).subscribe({
      next:(resp)=>{
        console.log('entrando')
        Swal.fire({
          icon: 'success',
          title: 'Gracias por su compra!',
          text: 'Estas de vuelta en el listado!',
      });
       this.router.navigate(['/cars/listCar'])
       this.vaciarCarrito();


       
      },error:(e)=>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido al tratar de realizar la compra!',
          footer: '<a href="">Why do I have this issue?</a>'
        })

      }
    })
  }
  

}
