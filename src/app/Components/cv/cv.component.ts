import { Component, OnInit } from '@angular/core';
import { CvCandidatService } from "../../Services/cv-candidat.service";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-cv',
  templateUrl: './cv.component.html',
  styleUrls: ['./cv.component.css']
})
export class CvComponent implements OnInit {
  authUserString = localStorage.getItem('authUser');
  public cv: any;
  public error: string | null = null;

  constructor(private cvCandidatService: CvCandidatService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.authUserString) {
      const authUser = JSON.parse(this.authUserString);
      this.cvCandidatService.getCvByCandidatId(authUser.id).subscribe({
        next: (data) => {
          this.cv = data;
          this.displayPdf();
        },
        error: (err) => {
          this.error = 'An error occurred while loading the CV.';
          console.log(err);
        }
      });
    }
  }

  displayPdf(): void {
    if (this.cv && this.cv.data) {
      const byteCharacters = atob(this.cv.data);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const pdfBlob = new Blob([byteArray], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      this.cv.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    }
  }
}
