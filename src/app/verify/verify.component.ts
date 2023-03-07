import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute, ParamMap, Params } from '@angular/router';
import { VerifyService } from './services/verify.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styles: [
  ]
})
export class VerifyComponent {

  constructor(private service:VerifyService,private route:ActivatedRoute, private router:Router) { }
  code:string="";
  username:string="";

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.code=params['code']  //Recoge el codigo de los parametros mediante los queryParams
      this.username=params['username']//Recoge el username de los parametros mediante los queryParams
    })

    //Realiza la peticion mediante la llamada al servicio 
    this.service.verify(this.code,this.username).subscribe({
      next:(resp=>{
        if(resp){ //Si obtiene respuesta, verifica y salta mensaje de éxito
          Swal.fire({
            title: '¡Tu email ha sido verficado!',
            text: "Haz click para ir al login!",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ir al login!'
          }).then((result) => { //Si confirma ir al login lo lleva a la página principal
            if (result.isConfirmed) {
              this.router.navigate(['/'])
            }
          })
        }
      })
    })

    
  };
      
  

    
  }

