import {Component, OnInit} from '@angular/core';
import {OffreService} from "../../Services/offre.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../Services/authentication.service";
import {DomaineService} from "../../Services/domaine.service";
import {VilleService} from "../../Services/ville.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";


@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrl: './offre.component.css'
})
export class OffreComponent implements OnInit {
  public JobOffers!: any;
  public villes!: any;
  public domaines!: any;
  // @ts-ignore
  yourListOfNiveau: string[] = [this.valeur,'Pas important ', 'Niveau Bac', 'Bac +2','Bac +3' ,'Bac +4','Bac +5'];
  public valeur:String = 'tout';
  // Add properties to bind to the search inputs
  ville = '';
  niveauEtude = '';
  domaine = '';
  keyName = '';
  isLoading = false;


  constructor(private  JobOffersService:OffreService,
              private domaineService: DomaineService,
              private villeService: VilleService,
              //private  viewCountServiceService : ViewCountServiceService,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.OnDomaines();
    this.OnVilles();
    this.chercher();
  }

  OnVilles(): void {
    this.valeur='Tout'
    this.villeService.getVilles()
      .subscribe(data=>{
          this.villes=data;
          this.villes.unshift({id:0, nom: this.valeur});
        },
        err=>{
          console.log(err);
        })
  }

  OnDomaines(): void {
    this.valeur='Tout'
    this.domaineService.getDomaines()
      .subscribe(data=>{
          this.domaines=data;
          this.domaines.unshift({id:0, nom: this.valeur});
        },
        err=>{
          console.log(err);
        })
  }

  OnGetOffers(v: any) {
    this.JobOffersService.getOffres()
      .subscribe(data=>{
          this.JobOffers=data;
        },
        err=>{
          console.log(err);
        })
  }

  // Add a method to call the search method from your service
  chercher() {
    this.valeur=''
    this.isLoading = true;
    if (this.ville || this.niveauEtude || this.domaine || this.keyName) {
      this.JobOffersService.searchOffresEmploi(this.ville, this.niveauEtude, this.domaine, this.keyName).subscribe(JobOffers => {
        this.JobOffers = JobOffers;
        this.isLoading = false;
      });
    } else {
      this.JobOffersService.getOffres().subscribe(JobOffers => {
        this.JobOffers = JobOffers;
        this.isLoading = false;
      });
    }
  }

  getImageData(blob: Blob): SafeUrl {
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    let url = reader.result;
    return this.sanitizer.bypassSecurityTrustUrl(url as string);
  }

 /* incrementViewCount(id: number): void {
    this.viewCountServiceService.incrementViewCount(id);
  }*/










  /*authUserString = localStorage.getItem('authUser');
  public offres: any;
  message: any;
  Errormessage: any;

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
          this.message = "You have successfully postuler to this job";
          setTimeout(() => {
            this.message = null;
          }, 2000); // Efface le message après 2 secondes
        },
        error: (err) => {
          this.Errormessage = "You have already applied to this job";
          setTimeout(() => {
            this.Errormessage = null;
          }, 2000);
        }
      });
    }


  }*/
}

