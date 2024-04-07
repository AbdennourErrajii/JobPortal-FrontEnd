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
          console.log(err);
        }
      });
    }
  }

  displayPdf(): void {
    if (this.cv && this.cv.data) {
      const pdfBlob = new Blob([this.cv.data], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      this.cv.pdfSrc = this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
    }
  }
}
