import {Component, OnInit} from '@angular/core';
import {CandidatureService} from "../../Services/candidature.service";

@Component({
  selector: 'app-candidature',
  templateUrl: './candidature.component.html',
  styleUrl: './candidature.component.css'
})
export class CandidatureComponent  implements  OnInit{

  authUserString = localStorage.getItem('authUser');
  public offresPostuler:any ;
constructor(private candidatureService: CandidatureService) {
}
  ngOnInit(): void {
  if (this.authUserString) {
      // Parsez la chaîne JSON pour obtenir l'objet
      const authUser = JSON.parse(this.authUserString);
      // Accédez à la propriété "username"
      this.candidatureService.getOffresPostuler(authUser.id).subscribe({
        next: (data) => {
          this.offresPostuler = data;
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }



  public handleDeleteCandidature(id:number): void {
    // Check with a confirmation
    const confirmation = window.confirm('Are you sure you want to delete this candidacy?');
    // If the user confirms deletion
    if (confirmation) {
      this.candidatureService.deletCandidature(id).subscribe(
          () => {
            this.ngOnInit();
            console.log('Candidacy deleted successfully');
            // Update display or perform other necessary actions after deletion
          },
          error => {
            console.error('Error deleting candidacy: ', error);
            // Handle candidacy deletion error
          }
      );
    } else {
      console.log('Deletion canceled by the user');
      // Handle deletion cancellation
    }
  }



}

