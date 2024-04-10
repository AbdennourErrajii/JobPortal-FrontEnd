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
import { PersonalInfoComponent } from './Components/personal-info/personal-info.component';
import { AddJobOfferComponent } from './Components/add-job-offer/add-job-offer.component';
import { EditJobOfferComponent } from './Components/edit-job-offer/edit-job-offer.component';
import { JobOfferDetailComponent } from './Components/job-offer-detail/job-offer-detail.component';

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
    PersonalInfoComponent,
    AddJobOfferComponent,
    EditJobOfferComponent,
    JobOfferDetailComponent
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
