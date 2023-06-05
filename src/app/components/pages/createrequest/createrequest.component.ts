import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/internal/operators/tap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Authguard } from 'src/app/shared/authguard.guard';

interface Petition {
  images: [] |null;
  description: string;
  title: string;
  address: string;
  longitude: number;
  latitude: number;
}

@Component({
  selector: 'app-createrequest',
  templateUrl: './createrequest.component.html',
  styleUrls: ['./createrequest.component.css']
})
export class CreaterequestComponent implements OnInit {
  petitionForm!: FormGroup;
  latitude: number;
  longitude: number;
  images:any;
  marker: google.maps.Marker;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient,private guard: Authguard) {}

  ngOnInit(): void {
    this.buildForm();
    this.guard.canActivate;

    let loader = new Loader({
      apiKey: 'AIzaSyAkcsuctaRniGDhVi-sTEkyHMrfUoSQQNM', // Replace with your API key
      libraries: ['places']
    });
    loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
        center: { lat: 51.09555413778817, lng: 71.41688914019382 },
        zoom: 15
      });

      this.marker = new google.maps.Marker({
        position: { lat: 51.09555413778817, lng: 71.41688914019382 },
        map: map,
        draggable: true
      });

      const input = document.getElementById('searchbox') as HTMLInputElement;
      const autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry || !place.geometry.location) {
          window.alert("No details available for input: '" + place.name + "'");
          return;
        }

        this.marker.setPosition(place.geometry.location);
        map.setCenter(place.geometry.location);
        map.setZoom(15);

        this.latitude = place.geometry.location.lat();
        this.longitude = place.geometry.location.lng();
        this.petitionForm.controls['address'].setValue(place.formatted_address);
      });

      this.marker.addListener('dragend', () => {
        const position = this.marker.getPosition();
        if (position) {
          this.latitude = position.lat();
          this.longitude = position.lng();

          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: position }, (results, status) => {
            if (status === "OK" && results && results.length > 0) {
              this.petitionForm.controls['address'].setValue(results[0].formatted_address);
            } else {
              window.alert("Geocoder failed due to: " + status);
            }
          });
        }
      });
    });
  }

  buildForm(): void {
    this.petitionForm = this.formBuilder.group({
      images: [''],
      description: ['', Validators.required],
      title: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onFileSelect(event:any){
    this.images = event.target.files[0];
    console.log("file",this.images);
  
  }

  save() {
    const bodyData: Petition = this.petitionForm.value;
    const formData = new FormData();
    formData.append('description', bodyData.description);
    formData.append('title', bodyData.title);

    if (this.images) {
      formData.set('images', this.images);
    }

    formData.append('latitude', this.latitude.toString());
    formData.append('longitude', this.longitude.toString());

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    this.http.post("http://localhost:8080/petitions/create", formData, { headers, responseType: 'text' }).subscribe(
      (resultData: any) => {
        console.log(resultData);
        alert("Your request has been submitted");
        this.router.navigateByUrl('/main_page')
      },
      (error: any) => {
        alert("some fields are misssed, try again");
      }
    );
  }

}


//apiKey: 'AIzaSyAkcsuctaRniGDhVi-sTEkyHMrfUoSQQNM',