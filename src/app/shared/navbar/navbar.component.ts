import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RolGuardGuard } from '../../rol-guard.guard';
import { user } from '../../interfaces/user.interface';
import { UsersService } from '../../users/services/users.service';
import { cars } from '../../interfaces/cars.interface copy';
import { ShoppingService } from '../../shopping-cart/services/shopping.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private authService: AuthService,private userService:UsersService, private shopping:ShoppingService) { }

  username!:string
  admin!:boolean
  jwt: string | null = null;
  user!:user 

  carrito: cars[]= this.shopping.getShopping();

  
  
  
  

  ngOnInit(): void {
    this.jwt = localStorage.getItem('Authorization');
    

    

    
    if(this.jwt){
      this.admin = this.authService.isUserAdmin(this.jwt);
      this.username=this.authService.returnUser(this.jwt)
      this.userService.getUser(this.username).subscribe({
        next:(resp=>{
          this.user=resp
         

        })
      })
    }
  }
 

  logout(){
    localStorage.removeItem("Authorization");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    localStorage.setItem("loggin","false")
    window.location.reload()
    

  }
  
}
