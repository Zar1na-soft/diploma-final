import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isAuthenticated: boolean;
  @ViewChild('myDiv') myDiv: ElementRef;

 

  scrollTo() {
    this.myDiv.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }


  constructor(private http: HttpClient, private router: Router) {
    this.isAuthenticated = !!localStorage.getItem('token');
  
  }
  goForward() : void{
    if(this.isAuthenticated){
      this.router.navigate(['/main_page']);
    }
    else{
      this.router.navigate(['/sign_in']);
    }
    
  }

}
