import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RolGuardGuard } from '../../rol-guard.guard';
import { user } from '../../interfaces/user.interface';
import { UsersService } from '../../users/services/users.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private authService: AuthService,private userService:UsersService) { }

  username!:string
  admin!:boolean
  jwt: string | null = null;
  user!:user 

  ngOnInit(): void {
    this.jwt = localStorage.getItem('Authorization');

    if(this.jwt){
      this.admin = this.authService.isUserAdmin(this.jwt);
      this.username=this.authService.returnUser(this.jwt)
      this.userService.getUser(this.username).subscribe({
        next:(resp=>{
          this.user=resp
          console.log(this.user)

        })
      })
    }
  }
 

  logout(){
    localStorage.removeItem("Authorization");
    localStorage.setItem("loggin","false")
    

  }
  
}
