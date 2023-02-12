import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @ViewChild('formLogin') formLogin!: NgForm
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  validateUsername(): boolean{
    return this.formLogin?.controls['username'].invalid
    && this.formLogin?.controls['username'].touched;

  }

  validatePassword():boolean{
    return this.formLogin?.controls['password'].invalid
    && this.formLogin?.controls['password'].touched;
  }
  save(){
    if(this.formLogin.valid){
      Swal.fire({
        icon: 'success',
        title: 'Has iniciado Sesión',
        text: '¡Bienvenido a los Santos Customs!',
    });
    this.router.navigate(['/home'])



    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>'
      })
    }

  }

 



}
