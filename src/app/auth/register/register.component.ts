import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private router:Router) { }

  registerForm: FormGroup = this.fb.group({
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
    if(this.registerForm.valid){
      this.registerForm.markAllAsTouched()
      Swal.fire({
        icon: 'success',
        title: 'Registro completado',
        text: '¡Bienvenido a los Santos Customs!',
      });
      this.router.navigate(['/'])
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Registro incorrecto, algo ha salido mal...',
      });
    }
  }

}
