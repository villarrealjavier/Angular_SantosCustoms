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
  @ViewChild('formLogin') formLogin!: NgForm //Formulario template 

  //Implementamos router y el servicio de AuthService
  constructor(private router: Router,private service:AuthService) { }
  username:string=""; //Nombre de usuario
  password:string=""; // Contraseña
  login:boolean=false; // Login la cual vamos a subir al localStorage

  ngOnInit(): void {
  }

  //Validacion de nombre de usuario
  validateUsername(): boolean{
    this.username = this.formLogin?.controls['username'].value; //Asigamos el valor a una variable que usaremos más tarde
    
    return this.formLogin?.controls['username'].invalid// Comprobamos si es inválido y esta tocado.
    && this.formLogin?.controls['username'].touched;

  }

  //Validacion de contraseña
  validatePassword():boolean{
    this.password= this.formLogin?.controls['password'].value; //Asigamos el valor a una variable que usaremos más tarde

    return this.formLogin?.controls['password'].invalid // Comprobamos si es inválido y esta tocado.
    && this.formLogin?.controls['password'].touched;
  }

  //Metodo de login
  logged(){
    this.service.login(this.username,this.password).subscribe({ //Realizamos la peticion de login
        next: (resp) => {
          if (resp) { // Si tenemos una respuesta, es decir nos devuelve el token
            if(this.formLogin.valid){
              this.login=true;
              Swal.fire({
                icon: 'success',
                title: 'Has iniciado Sesión',
                text: '¡Bienvenido a los Santos Customs!',
            });
            this.router.navigate(['/'])
          }else { //Si no, reseteamos las variables
            this.username=''; 
            this.password='';
            
            
          }
        }
  

  }
})
  }}
