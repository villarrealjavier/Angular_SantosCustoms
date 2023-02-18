import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandService } from '../list/Brandservices.service';
import { brand } from '../../interfaces/brand.interface';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private fb: FormBuilder, private router:Router, private service:BrandService, private route: ActivatedRoute) { }
  
  id!:string;
  
  name_brand!:string;
  country!:string;
  

 
  ngOnInit(): void {
    const id = this.route.snapshot.params["id"]
    console.log(id)
    this.service.getBrandbyId(id).subscribe({
      next: resp=>{
        this.name_brand=resp.name_brand
        this.country=resp.country
        
      }
      
    })
   

    
  }
  updateBrand(){

  }

}
