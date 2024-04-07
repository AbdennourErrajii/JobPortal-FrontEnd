import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { ProfilComponent } from './Components/profil/profil.component';
import { OffreComponent } from './Components/offre/offre.component';
import { CandidatureComponent } from './Components/candidature/candidature.component';
import { HeadComponent } from './Components/head/head.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SignupComponent } from './Components/signup/signup.component';
import { CvComponent } from './Components/cv/cv.component';
import { FormationComponent } from './Components/formation/formation.component';
import { ExperienceComponent } from './Components/experience/experience.component';
import { PersonalInfoComponent } from './Components/personal-info/personal-info.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfilComponent,
    OffreComponent,
    CandidatureComponent,
    HeadComponent,
    SignupComponent,
    CvComponent,
    FormationComponent,
    ExperienceComponent,
    PersonalInfoComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
    ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
