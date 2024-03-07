import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HeadComponent} from "./Components/head/head.component";
import {HomeComponent} from "./Components/home/home.component";
import {ProfilComponent} from "./Components/profil/profil.component";
import {OffreComponent} from "./Components/offre/offre.component";
import {CandidatureComponent} from "./Components/candidature/candidature.component";
import {LoginComponent} from "./Components/login/login.component";
import {AuthenticationGuard} from "./Guards/authentication.guard";
import {SignupComponent} from "./Components/signup/signup.component";

const routes: Routes = [
  { path: "login", component:  LoginComponent},
  { path: "", component:  LoginComponent },
  {path:"signup",component:SignupComponent},
  { path: "user", component:  HeadComponent ,canActivate: [AuthenticationGuard],
    children:[
      { path: "home", component:  HomeComponent },
      { path: "profile", component:   ProfilComponent},
      { path: "offres", component:  OffreComponent },
      { path: "candidatures", component:  CandidatureComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
