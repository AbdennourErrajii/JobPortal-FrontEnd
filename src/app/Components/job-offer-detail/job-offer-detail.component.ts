import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../Services/offre.service";
import {AuthenticationService} from "../../Services/authentication.service";


@Component({
  selector: 'app-job-offer-detail',
  templateUrl: './job-offer-detail.component.html',
  styleUrl: './job-offer-detail.component.css'
})
export class JobOfferDetailComponent {
  id!: any;
  jobOffer: any;
  authUserString = localStorage.getItem('authUser');
  public offres: any;
  message: any;
  Errormessage: any;

  constructor(
    private route: ActivatedRoute,
    private jobOfferService: OffreService,
    private offreService: OffreService,
    private router: Router,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.jobOfferService.getOffer(this.id).subscribe(jobOffer => {
      this.jobOffer = jobOffer;
    });
  }

  handlePostuler(offreId: number) {

    if (this.authUserString) {

      // Parsez la chaîne JSON pour obtenir l'objet
      const authUser = JSON.parse(this.authUserString);

      console.log("111111111111111111");
      // Accédez à la propriété "username"
      this.offreService.postuler(authUser.id, offreId).subscribe({
        next: (data) => {
          this.message = "You have successfully postuler to this job";
          setTimeout(() => {
            this.message = null;
          }, 2000); // Efface le message après 2 secondes
        },
        error: (err) => {
          /*this.Errormessage = "You have already applied to this job";
          setTimeout(() => {
            this.Errormessage = null;
          }, 2000);*/
          {
            // Erreur : affichez un message d'erreur approprié en fonction du code d'erreur
            if (err.status === 409) {
              this.Errormessage = "You have already applied to this job";
              setTimeout(() => {
                this.Errormessage = null;
              }, 2000);

            } else {
              console.error('An error occurred during the application:', err);
              // Affichez un message d'erreur générique à l'utilisateur
            }
          }
        }
      });
    }

  }
}
