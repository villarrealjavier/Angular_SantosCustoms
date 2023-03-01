import { Component, OnInit } from '@angular/core';
import { brand } from '../../interfaces/brand.interface';
import { BrandService } from './Brandservices.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service:BrandService) { }
  role:string | null=localStorage.getItem("role") 
  marcas:brand[]=[]

  ngOnInit(): void {
    this.service.getBrands().subscribe({
      next: (resp)=> this.marcas=resp
    })
  }

  

}
