import {Component, OnInit} from '@angular/core';
import {OffreService} from "../../Services/offre.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../Services/authentication.service";


@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.css'
})
export class OffreComponent implements OnInit {
    authUserString = localStorage.getItem('authUser');
    public offres: any;
    postulationReussie: any;

    constructor(private offreService: OffreService,private router:Router,public authService:AuthenticationService) {
    }

    ngOnInit(): void {

        this.offreService.getOffres()
            .subscribe(data => {
                this.offres = data;

            }, error => {
                console.log(error);
            })

    }


    handlePostuler(offreId: number) {

        if (this.authUserString) {

            // Parsez la chaîne JSON pour obtenir l'objet
            const authUser = JSON.parse(this.authUserString);


            // Accédez à la propriété "username"
            this.offreService.postuler(authUser.id, offreId).subscribe({
                next: (data) => {
                    this.postulationReussie = true;
                    // Masquez le message après 3000 millisecondes (3 secondes)
                    setTimeout(() => {
                        this.postulationReussie = false;
                    }, 3000);
                },
                error: (err) => {
                    console.log('Erreur lors de la postulation:', err);

                }
            });
        }


    }
}
