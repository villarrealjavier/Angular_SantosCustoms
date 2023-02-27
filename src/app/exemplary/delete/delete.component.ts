import { Component } from '@angular/core';
import { brand } from '../../interfaces/brand.interface';
import { BrandService } from '../../category/list/Brandservices.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ExemplaryService } from '../services/exemplary.service';
import { exemplary } from '../../interfaces/exemplary.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styles: [
  ]
})
export class DeleteComponent {
  
  name_exemplary!:string;
  name_brand!:string


  constructor(private brandService:BrandService, private route:ActivatedRoute, private exemplaryService:ExemplaryService,private router:Router){

  }
  ngOnInit(){
    this.name_exemplary=this.route.snapshot.params["id"]
    this.getExemplary()
    
    
    

  }

  getExemplary(){
    this.exemplaryService.getExemplaryById(this.name_exemplary).subscribe({
      next:(resp=>{
        this.name_brand=resp.name_brand.name_brand
      })
    })

    
   
  }
  deleteBrand(){
    return this.exemplaryService.deleteExemplary(this.name_exemplary).subscribe({
      next:(resp=>{
        if(resp){
          Swal.fire({
            icon: 'success',
            title: 'El modelo ha sido eliminado con éxito!',
            text: 'Estas de vuelta en el listado!',
        });
        this.router.navigate(['/exemplary/listExemplary'])
          
        }else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo debe haber salido mal!',
            footer: '<a href="">Why do I have this issue?</a>'
          })
          
          
        }
      })
    })
  }
}
