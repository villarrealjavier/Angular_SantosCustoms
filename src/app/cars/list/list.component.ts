import { Component, OnInit } from '@angular/core';
import { ListService } from '../list.service';
import { cars } from '../../interfaces/cars.interface copy';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private service:ListService) { }

  cars:cars[]=[]
  totalRecords!:number;

  ngOnInit(): void {
    this.service.getCars().subscribe({
      next: (resp)=> this.cars=resp
    })

    this.totalRecords=this.cars.length

  }

}
