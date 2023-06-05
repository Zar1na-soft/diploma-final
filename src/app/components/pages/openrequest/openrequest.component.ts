import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { Authguard } from 'src/app/shared/authguard.guard';
import { Petition } from 'src/app/shared/petitions';


@Component({
  selector: 'app-openrequest',
  templateUrl: './openrequest.component.html',
  styleUrls: ['./openrequest.component.css']
})
export class OpenrequestComponent implements OnInit {
  petition: Petition;
  isAuthenticated: boolean = false;
  petitionId: number;
  marker: google.maps.Marker;

  
  constructor(private router: ActivatedRoute, private http: HttpClient,private authguard:Authguard) { 
    this.isAuthenticated = !!localStorage.getItem('token'); 
   }

  title = 'google-maps';
  ngOnInit(): void {
    this.router.params.subscribe(params => {
      this.petitionId = params['petitionId'];
      this.fetchPetitions();
    });
    this.authguard.canActivate;

    let loader = new Loader ({
      apiKey: 'AIzaSyAkcsuctaRniGDhVi-sTEkyHMrfUoSQQNM',
      libraries: ['places']
    });

    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: { lat: 51.09555413778817, lng: 71.41688914019382 },
        zoom: 15,
      });
      this.marker = new google.maps.Marker({
        position: { lat: 51.09555413778817, lng: 71.41688914019382 },
        map: map,
        draggable: false
      });

      this.marker.setMap(map);
      
      
    });
    
  }

 

  fetchPetitions(): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    const url = `http://localhost:8080/petitions/${this.petitionId}`;
    this.http.get(url, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        if (response ) {
          this.petition = response;
          this.petition.likedByThisUser = false;
          
          this.convertLatLngToAddress(this.petition, this.petition.latitude, this.petition.longitude);
         
        } 
      },
      (error: any) => {
        console.log('Error:', error);
      }
    );
  }

  convertLatLngToAddress(petition: Petition, latitude: number, longitude: number): void {
    // Create Geocoder instance
    const geocoder = new google.maps.Geocoder();
  
    // Get address from latitude and longitude
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
  
    const latLng = { lat: latitude, lng: longitude };
    console.log('LatLng:', latLng);
  
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results && results.length > 0) {
          const address = results[0].formatted_address;
          console.log('Address:', address);
          petition.address = address; 
          this.marker.setPosition(latLng);
        } else {
          console.log('No results found');
        }
      } else {
        console.log('Geocoder failed due to: ' + status);
      }
    });
  }
  
  generateShortDescription(description: string, maxLength: number = 75): string {
    if (description.length <= maxLength) {
      return description;
    } else {
      return description.substr(0, maxLength) + '...';
    }
  }
  likePetition(petition: Petition){
    if(!this.isAuthenticated){
      return;
    }
    petition.likedByThisUser = !petition.likedByThisUser;
    const likeStatus = petition.likedByThisUser ? 'like' : 'unlike';
    const url = `http://localhost:8080/petitions/${likeStatus}?id=${petition.petitionId}`;
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    

    this.http.patch(url, null, { headers }).subscribe(
      (response) => {
        if(likeStatus == 'like'){
          petition.likesNumber++;
          petition.likedByThisUser = true;
          console.log('yes');
        }
        else{
          petition.likesNumber--;
          petition.likedByThisUser = false; 
        }
      
  
      },
    );  
}



}
