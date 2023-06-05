import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Petition } from 'src/app/shared/petitions';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  petitions: Petition[];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = 'http://localhost:8080/petitions/profile?page=0&size=10';

    this.http.get<any>(url, { headers }).subscribe(
      (response: any) => {
        if (response && Array.isArray(response.content)) {
          this.petitions = response.content.map((petition: Petition) => {
            // Fetch latitude and longitude from the petition object
            const latitude = petition.latitude;
            const longitude = petition.longitude;

            // Call method to convert latitude and longitude to address
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
          petition.address = address; // Add address property to the Petition object
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }
}
