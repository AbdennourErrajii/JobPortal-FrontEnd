
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import {Router} from "@angular/router";
import {ImageCandidatService} from "../../Services/image-candidat.service";
import {CvCandidatService} from "../../Services/cv-candidat.service";
import {response} from "express";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    role: string = '';
    candidateForm!: FormGroup;
    employerForm!: FormGroup;
    public successMessage: string | null = null;

    constructor(private fb: FormBuilder,
                private signupService: SignupService,
                private router: Router,
                private imageCandidatService: ImageCandidatService,
                private cvCandidatService: CvCandidatService) {
    }

    ngOnInit(): void {
    }

    candidat = {
        nom: '',
        prenom: '',
        role: this.role,
        sexe: '',
        email: '',
        motDePasse: '',
        telephone: '',
        adresse: '',
        lieuDeResidence: '',
        lettreMotivation: '',
        cvCandidat: null,
        imageCandidat: null
    };
  employeur = {
    nomEntreprise: '',
    nom: '',
    prenom:'',
    role: this.role,
    email: '',
    motDePasse: '',
    logo: null,
    secteurActivite: '',
    ville: '',
    adresse: '',
    offresEmploi: []
  };

    handelSignIn() {
        this.router.navigateByUrl('/login');
    }

    selectRole(role: string) {
        this.role = role;
    }

    onImageChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length) {
            const file = target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                // Stocker localement l'image dans le composant
                // @ts-ignore
                this.candidat.imageCandidat = file;

                // Envoyer l'image au serveur
                const formData = new FormData();
                // @ts-ignore
                formData.append('file', this.candidat.imageCandidat);

                this.imageCandidatService.createImage(formData).subscribe({
                    next: (imageData: any) => {
                        // Ajouter l'ID de l'image aux données du candidat
                        this.candidat.imageCandidat = imageData;
                    },
                    error: (err) => {
                        console.error('Erreur lors de l\'enregistrement de l\'image:', err);
                    }
                });
            };

            reader.readAsDataURL(file);
        }
    }



    onCvChange(event: Event) {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files.length) {
            const file = target.files[0];
            const reader = new FileReader();

            reader.onload = (e) => {
                // Stocker localement le CV dans le composant
                // @ts-ignore
                this.candidat.cvCandidat = file;

                // Envoyer le CV au serveur
                const formData = new FormData();
                // @ts-ignore
                formData.append('file', this.candidat.cvCandidat);

                this.cvCandidatService.createCv(formData).subscribe({
                    next: (cvData: any) => {
                        // Ajouter l'ID du CV aux données du candidat
                        this.candidat.cvCandidat = cvData;
                    },
                    error: (err) => {
                        console.error('Erreur lors de l\'enregistrement du CV:', err);
                    }
                });
            };

            reader.readAsDataURL(file);
        }
    }



    handelRegister() {

        if (this.role === 'candidate') {
            this.signupService.registerCandidate(this.candidat).subscribe({
                next: (data) => {
                    this.successMessage = 'successfully created an account';
                },
                error: (err) => {
                    console.log('Erreur lors de l\'enregistrement du candidat:', err);
                }
            });

        } else if (this.role === 'employer') {

        }

    }
}




