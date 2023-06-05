import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
   email: string ="";
   password: string="";

   constructor(private router: Router, private http: HttpClient){

   }

   Login() {
    console.log(this.email);
    console.log(this.password);

    let bodyData = {
      email: this.email,
      password: this.password,
    };

    this.http.post("http://localhost:8080/auth/authenticate", bodyData).subscribe((resultData: any)=>{
      
        this.router.navigateByUrl('/main_page');
        const token = resultData.token;
        localStorage.setItem('token', token);
  
        

    })
   }
   
}
