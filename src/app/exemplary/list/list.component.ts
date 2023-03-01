import { Component } from '@angular/core';
import { exemplary } from '../../interfaces/exemplary.interface';
import { ActivatedRoute } from '@angular/router';
import { ExemplaryService } from '../services/exemplary.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent {

  listExemplary:exemplary[]=[]
  role:string | null=localStorage.getItem("role") 
  constructor(private route:ActivatedRoute,private service:ExemplaryService ){

  }

  ngOnInit(){
     this.service.getExemplaries().subscribe({
      next:(resp=>{
      this.listExemplary=resp
    
      })
     })

  }
}
