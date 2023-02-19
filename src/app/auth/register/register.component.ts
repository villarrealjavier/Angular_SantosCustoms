import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  
  constructor(private fb: FormBuilder, private router:Router, private service:AuthService) { }

  registerForm: FormGroup = this.fb.group({
    username:['',[Validators.required, Validators.minLength(3)]],
    nombre:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.minLength(8)]],
    repeatpassword:['',[Validators.required,Validators.minLength(3),this.match('password')]]
  })

  ngOnInit(): void {
  }

  isValidField(field:string){
    return this.registerForm?.controls[field].errors
    && this.registerForm?.controls[field].invalid && this.registerForm.controls[field].touched
  }
  isValidPassword(field:string){
    return this.registerForm?.controls[field].errors
    && this.registerForm?.controls[field].invalid && this.registerForm.controls[field].touched && this.registerForm.controls[field].errors?.['mismatch']
  }

  match(controlName: string) {
    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      return control.value === control.parent.get(controlName)?.value? null : { mismatch: true };
    };
  }

  saveRegister(){
    const username:string =this.registerForm.get('username')?.value
    const password:string = this.registerForm.get('password')?.value
    const name:string = this.registerForm.get('nombre')?.value
    const email:string =this.registerForm.get('email')?.value
    console.log(username,password,name,email)
    this.service.register(username,password,email,name
    ).subscribe({
        next: (resp) => {
          if (resp) {
            console.log(resp)
            if(this.registerForm.valid){
            
              Swal.fire({
                icon: 'success',
                title: 'Revisa el correo electrónico y verifica el correo',
                text: '¡Bienvenido a los Santos Customs!',
            });
            this.router.navigate(['/'])

          }else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Algo debe haber salido mal!',
              footer: '<a href="">Why do I have this issue?</a>'
            })
            
            
          }}}})
       }
  

  }


