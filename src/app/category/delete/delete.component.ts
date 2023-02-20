import { Component, OnInit } from '@angular/core';
import { BrandService } from '../list/Brandservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  name_brand!:string;
  country!:string

  constructor(private service: BrandService, private route:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.name_brand=this.route.snapshot.params["id"]
    this.service.getBrandbyId(this.name_brand).subscribe({
      next: (resp) => {
        this.country=resp.country
      }
    })
  }

  deleteBrand(){
    this.service.deleteBrand(this.name_brand).subscribe({
      next:(resp)=>{
        if(resp){
          
          Swal.fire({
            icon: 'success',
            title: 'La marca ha sido editada con éxito!',
            text: 'Estas de vuelta en el listado!',
        });
        this.router.navigate(['/category/listCategory'])

      }else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No tienes permisos!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
        
        
      }
        
  }
})

  }
}
