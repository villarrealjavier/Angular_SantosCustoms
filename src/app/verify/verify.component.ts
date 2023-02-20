import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { VerifyService } from './services/verify.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styles: [
  ]
})
export class VerifyComponent {

  constructor(private router:Router, private service:VerifyService,private route:ActivatedRoute) { }
code!:string;

  ngOnInit(): void {
  this.code= this.route.snapshot.params['code']
  console.log(this.code)
    Swal.fire({
      icon: 'success',
      title: 'Su cuenta ha sido verficada con éxito!',
      text: 'Estas de vuelta en el listado!',
  });
    
  }
}
