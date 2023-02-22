import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RolGuardGuard } from '../../rol-guard.guard';
import { user } from '../../interfaces/user.interface';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(private router:Router,private authService: AuthService) { }

  ngOnInit(): void {
    this.jwt = localStorage.getItem('Authorization');

    if(this.jwt){
      this.admin = this.authService.isUserAdmin(this.jwt);
      this.username=this.authService.returnUser(this.jwt)
      this.user=this.authService.returnUserCompleted(this.jwt)
      console.log(this.user)
    }
  }
  username:string | null = null
  admin!:boolean
  jwt: string | null = null;
  user!:user 

  logout(){
    localStorage.removeItem("Authorization");
    localStorage.setItem("loggin","false")
    

  }
  
}
