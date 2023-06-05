import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Petition } from 'src/app/shared/petitions';

interface UserProfile {
  id: number;
  email: string;
  name: string;
  surname: string;
  permissions: string[];
}
@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

export class AdminPageComponent implements OnInit{
  openPetitions: Petition[];
  closedPetitions: Petition[];
  solvedPetitions: Petition[];
  sortAscending = true;
  petitionId: number;
  profile: UserProfile;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
    this.fetchClosedPetiton();
    this.fetchSolvedPetitions();
    this.fetchAdmin();
  
  }

  fetchUserProfile(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = 'http://localhost:8080/petitions/open?page=0&size=10';

    this.http.get<any>(url, { headers }).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          this.openPetitions = response.content.map((petition: Petition) => {
            const latitude = petition.latitude;
            const longitude = petition.longitude;

            this.convertLatLngToAddress(petition, latitude, longitude);

            return petition;
          });
        }
      },
      (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }

  convertLatLngToAddress(petition: Petition, latitude: number, longitude: number): void {
    // Create Geocoder instance
    const geocoder = new google.maps.Geocoder();

    // Get address from latitude and longitude
    const latLng = { lat: latitude, lng: longitude };
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results && results.length > 0) {
          const address = results[0].formatted_address;
          petition.address = address; 
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }

  fetchClosedPetiton(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = 'http://localhost:8080/petitions/closed?page=0&size=10';

    this.http.get<any>(url, { headers }).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          this.closedPetitions = response.content.map((petition: Petition) => {
            const latitude = petition.latitude;
            const longitude = petition.longitude;
            this.convertLatLngToAddress(petition, latitude, longitude);

            return petition;
          });
        }
      },
      (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }
  sortPetitionsByCreated(): void {
    if (this.openPetitions) {
      this.openPetitions.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        const comparison = this.sortAscending ? dateA - dateB : dateB - dateA;
        return comparison;
      });
    }

    if (this.closedPetitions) {
      this.closedPetitions.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        const comparison = this.sortAscending ? dateA - dateB : dateB - dateA;
        return comparison;
      });
    }

    this.sortAscending = !this.sortAscending; // Toggle the sorting order
  }
  fetchSolvedPetitions(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = 'http://localhost:8080/petitions/solved?page=0&size=10';

    this.http.get<any>(url, { headers }).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          this.solvedPetitions = response.content.map((petition: Petition) => {
            const latitude = petition.latitude;
            const longitude = petition.longitude;
            this.convertLatLngToAddress(petition, latitude, longitude);
            console.log(petition);
            return petition;
            
          });
        }
      },
      (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }

  submitFeedback(petition: Petition): void {
    const decisionDescription = petition.decisionDescription;
    const accepted = petition.accepted ? 'true' : 'false';
    const url = `http://localhost:8080/petitions/judge?petitionId=${petition.petitionId}&decisionDescription=${decisionDescription}&accepted=${accepted}`;

        const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const body = {
      petitionId: petition.petitionId,
      decisionDescription,
      accepted
    };
    console.log(petition.petitionId);
  
  
    this.http.post(url, body, { headers }).subscribe(
      (response: any) => {
      console.log(petition.petitionId);
       console.log(response);
       location.reload();
       
      },
      (error: any) => {
        console.error('Failed to submit feedback:', error);
      }
    );
  }

  fetchAdmin(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = 'http://localhost:8080/users/profile';
  
    this.http.get<UserProfile>(url, { headers }).subscribe(
      (response: UserProfile) => {
        console.log('User permissions:', response.permissions);
      },
      (error: any) => {
        console.error('Failed to fetch user profile:', error);
      }
    );
  }
  
  
  
}
