import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
  
})
export class SignUpComponent implements OnInit {
   email: string ="";
   password: string="";
   name: string ="";
   surname:string = "";

   constructor(private http: HttpClient, private route: Router){

   }
   save(){

    let bodyData = {
    
      "email": this.email,
      "password": this.password,
      "name": this.name,
      "surname": this.surname
};
this.http.post('http://localhost:8080/auth/register',bodyData,{responseType: 'text'}).subscribe((resultData: any)=>{
  console.log(resultData);
  alert("User Registred Succesfully");
  this.route.navigate(['/sign_in']);
  console.log(bodyData)

});
   }
  ngOnInit(): void {
  }

}
