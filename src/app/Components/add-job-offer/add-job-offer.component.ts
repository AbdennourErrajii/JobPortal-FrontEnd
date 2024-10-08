import { Component } from '@angular/core';
import {OffreService} from "../../Services/offre.service";
import {ImageOfferService} from "../../Services/image-offer.service";
import {DomaineService} from "../../Services/domaine.service";
import {VilleService} from "../../Services/ville.service";
import {AuthenticationService} from "../../Services/authentication.service";

@Component({
  selector: 'app-add-job-offer',
  templateUrl: './add-job-offer.component.html',
  styleUrl: './add-job-offer.component.css'
})
export class AddJobOfferComponent {

  authUserString = localStorage.getItem('authUser');
  public villes!: any  ;
  public domaines!: any;
  public successMessage: string | null = null;

  jobOffer = {
    titre: '',
    description: '',
    salaire: '',
    contrat: '',
    entreprise: '',
    niveauEtude: '',
    status: '',
    datePublication: new Date(),
    dateLimiteCandidature: null,
    employeur: { id: null as number | null },
    domaine: { id: null },
    Site_web: '',
    ville: { id: null },
    image: null
  };

  yourListOfContrats: string[] = ['CDI', 'CDD', 'Stage','Interim' ,'A discuter' /* ...other domaines... */];
  yourListOfNiveau: string[] = ['Pas important ', 'Niveau Bac', 'Bac +2','Bac +3' ,'Bac +4','Bac +5' /* ...other domaines... */];


  constructor(private jobOfferService: OffreService,
              private imageService : ImageOfferService ,
              private domaineService: DomaineService,
              private villeService: VilleService,
              private authService : AuthenticationService) { }

  ngOnInit(): void {
    this.OnDomaines();
    this.OnVilles();
    // @ts-ignore
    this.jobOffer.employeur.id = Number(this.authUserString.id);

  }


  OnVilles(): void {
    this.villeService.getVilles()
      .subscribe(data=>{
          this.villes=data;
        },
        err=>{
          console.log(err);
        })
  }

  OnDomaines(): void {
    this.domaineService.getDomaines()
      .subscribe(data=>{
          this.domaines=data;
        },
        err=>{
          console.log(err);
        })
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files && target.files.length) {
      const file = target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        // Convert base64 string to a blob
        const base64Data = reader.result as string;
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: file.type });

        // Append the blob to a FormData object
        const formData = new FormData();
        formData.append('file', blob, file.name);

        this.imageService.createImage(formData).subscribe(response => {
          console.log(response);
          // handle successful response here
        }, error => {
          console.error(error);
          // handle error here
        });
      };

      reader.readAsDataURL(file);
    }
  }

  onVilleChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedVilleName = target.options[target.selectedIndex].text;

    const selectedVille = this.villes.find((ville: any) => ville.nom === selectedVilleName);
    if (selectedVille) {
      this.jobOffer.ville = { id: selectedVille.id };
      console.log('Stored Ville ID:', this.jobOffer.ville);
    }
  }

  onDomaineChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const selectedDomaineName = target.options[target.selectedIndex].text;

    const selectedDomaine = this.domaines.find((domaine: any) => domaine.nom === selectedDomaineName);
    if (selectedDomaine) {
      this.jobOffer.domaine = { id: selectedDomaine.id };
      console.log('Stored Domaine ID:', this.jobOffer.domaine);
    }
  }

  onSubmit(): void {
    this.jobOfferService.addJobOffer(this.jobOffer).subscribe(
      response => {
        console.log('Job offer added successfully', response);
        this.successMessage = 'Job offer added successfully';
      },
      error => {
        console.error('Error while adding job offer', error);
        // handle error here
      }
    );
  }

}
