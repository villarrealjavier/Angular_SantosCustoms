import { Component, OnInit } from '@angular/core';
import { brand } from '../../interfaces/brand.interface';
import { BrandService } from './Brandservices.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  //Implementamos el servicio de marcas
  constructor(private service:BrandService) { }

  role:string | null=localStorage.getItem("role") //Obtenemos el rol del usuario para alternar la vista
  marcas:brand[]=[] // Listado de marcas a mostrar

  ngOnInit(): void {
    this.service.getBrands().subscribe({ // Realizamos la peticion y le asignamos la lista de coches a la variable
      next: (resp)=> this.marcas=resp
    })
  }

  

}
