import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { user } from 'src/app/interfaces/user.interface';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styles: [
  ]
})
export class UpdateComponent {

  
  user!:user

  constructor(private service:UsersService, private route:ActivatedRoute,private fb:FormBuilder){

  }
  json: any = {
  username:'',
  name: '',
  password: '',
  email:''
};

  ngOnInit(){
    const id = this.route.snapshot.params["id"]
    this.service.getUser(id).subscribe({
      next:(resp=>{
        this.user=resp
      })
    })
    
    
  }
  myForm: FormGroup = this.fb.group({
    name:['',[Validators.required, Validators.minLength(3)]],
    email:['',[Validators.required, Validators.minLength(3),Validators.email]],
    password:['',[Validators.required, Validators.minLength(6),Validators.maxLength(15)]],
    file:['',[Validators.required]],
    fileSource:['',[Validators.required]]

  })

  onFileChange(event:any) {
    console.log(event);
    
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

  isValidField(field:string){
    return this.myForm?.controls[field].errors
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched
  }
  isValidPassword(field:string){
    return this.myForm?.controls[field].errors
    && this.myForm?.controls[field].invalid && this.myForm.controls[field].touched && this.myForm.controls[field].errors?.['mismatch']
  }

  match(controlName: string) {
    return (control: FormControl) => {
      if (!control.parent) {
        return null;
      }

      return control.value === control.parent.get(controlName)?.value? null : { mismatch: true };
    };
  }

  updateUser(){
   
    this.json.username=this.user.username
    this.json.password = this.myForm.get('password')?.value
    this.json.email= this.myForm.get('email')?.value
    this.json.name=this.myForm.get('name')?.value

    console.log(this.json)
    this.service.updateUser(this.json,this.myForm.get('fileSource')?.value,this.user.username).subscribe({
      next:(resp=>{

      })
    })
  }
  

}
