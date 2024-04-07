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
import {CvComponent} from "./Components/cv/cv.component";
import {PersonalInfoComponent} from "./Components/personal-info/personal-info.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "/login", pathMatch: "full" }, // Rediriger vers la page de connexion par défaut
  { path: "signup", component: SignupComponent },
  {
    path: "user",
    component: HeadComponent,
    canActivate: [AuthenticationGuard],
    children: [
      { path: "home", component: HomeComponent },
      {path: "profile", component: ProfilComponent,
        children: [
          { path: "", redirectTo: "informations", pathMatch: "full" }, // Redirection vers /profile/informations par défaut
          { path: "informations", component: PersonalInfoComponent },
          { path: "CV", component: CvComponent }

        ]
      },
      { path: "offres", component: OffreComponent },
      { path: "candidatures", component: CandidatureComponent }
    ]
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
