import {Component, OnInit} from '@angular/core';
import {CandidatureService} from "../../Services/candidature.service";
import {PersonalInfoService} from "../../Services/personal-info.service";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.css'
})
export class PersonalInfoComponent implements OnInit{
  authUserString = localStorage.getItem('authUser');
  public Candidat!: any;
  isEditable = false;
  showPassword: boolean = false;

  constructor(private personalInfoService: PersonalInfoService) {
  }
  ngOnInit(): void {
    if (this.authUserString) {
      // Parsez la chaîne JSON pour obtenir l'objet
      const authUser = JSON.parse(this.authUserString);
      // Accédez à la propriété "username"
      this.personalInfoService.getCandidat(authUser.id).subscribe({
        next: (data) => {
          this.Candidat = data;
          console.log(this.Candidat);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
