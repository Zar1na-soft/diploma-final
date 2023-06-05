import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface UserProfile {
  id: number;
  email: string;
  name: string;
  surname: string;
  permissions: string[];
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean;
  hasAdminPermission: boolean;

  constructor(private router: Router, private http: HttpClient) {
    this.isAuthenticated = !!localStorage.getItem('token');
    this.hasAdminPermission = false;
  }

  ngOnInit(): void {
    this.fetchAdmin();
  }

  public logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    console.log("fire");
  }

  fetchAdmin(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = 'http://localhost:8080/users/profile';

    this.http.get<UserProfile>(url, { headers }).subscribe(
      (response: UserProfile) => {
        console.log('User permissions:', response.permissions);
        this.hasAdminPermission = response.permissions.includes('view-closed-petitions') && response.permissions.includes('judge-petition');
      },
      (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }
}
