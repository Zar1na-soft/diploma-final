import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {NgxPaginationModule} from 'ngx-pagination';
import {HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/pages/header/header.component';
import { FoorComponent } from './components/pages/foor/foor.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MainpageComponent } from './components/pages/mainpage/mainpage.component';
import { OpenrequestComponent } from './components/pages/openrequest/openrequest.component';
import { CreaterequestComponent } from './components/pages/createrequest/createrequest.component';
import { ButtonCreateComponent } from './components/buttons/button-create/button-create.component';
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';



@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FoorComponent,
        HomeComponent,
        MainpageComponent,
        OpenrequestComponent,
        CreaterequestComponent,
        ButtonCreateComponent,
        SignInComponent,
        SignUpComponent,
        UserProfileComponent,
        AdminPageComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgxPaginationModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
