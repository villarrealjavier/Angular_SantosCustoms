import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm
  constructor(private router: Router,private service:AuthService) { }
  username:string="";
  password:string="";
  login:boolean=false;

  ngOnInit(): void {
  }

  validateUsername(): boolean{
    this.username = this.formLogin?.controls['username'].value;
    
    return this.formLogin?.controls['username'].invalid
    && this.formLogin?.controls['username'].touched;

  }

  validatePassword():boolean{
    this.password= this.formLogin?.controls['password'].value;

    return this.formLogin?.controls['password'].invalid
    && this.formLogin?.controls['password'].touched;
  }
  logged(){
    this.service.login(this.username,this.password).subscribe({
        next: (resp) => {
          if (resp) {
            console.log(resp)
            if(this.formLogin.valid){
              this.login=true;
              Swal.fire({
                icon: 'success',
                title: 'Has iniciado Sesión',
                text: '¡Bienvenido a los Santos Customs!',
            });
            this.router.navigate(['/home'])
          }else {
            this.username=''; 
            this.password='';
            
            
          }
        }
  

  }
})
  }}
