import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/pages/home/home.component";
import {MainpageComponent} from "./components/pages/mainpage/mainpage.component";
import {OpenrequestComponent} from "./components/pages/openrequest/openrequest.component";
import {CreaterequestComponent} from "./components/pages/createrequest/createrequest.component";
import { SignInComponent } from './components/pages/sign-in/sign-in.component';
import { SignUpComponent } from './components/pages/sign-up/sign-up.component';
import { Authguard } from './shared/authguard.guard';
import { UserProfileComponent } from './components/pages/user-profile/user-profile.component';
import { AdminPageComponent } from './components/pages/admin-page/admin-page.component';

const routes: Routes = [
  {
    path:"",
    component: HomeComponent
  },
  {
    path:"main_page",
    component: MainpageComponent,
    canActivate: [Authguard]
  },
  {
    path:"admin_page",
    component: AdminPageComponent,
    canActivate: [Authguard]
  },

  {
    path:"create_request",
    component: CreaterequestComponent,
    canActivate: [Authguard]
  },
  {
    path:"sign_in",
    component: SignInComponent
  },

  {
    path:"sign_up",
    component: SignUpComponent
  },

  { 
    path: 'petitions/:petitionId',
    component: OpenrequestComponent

  },
  

  {path: 'user_account',component: UserProfileComponent,
  canActivate: [Authguard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
