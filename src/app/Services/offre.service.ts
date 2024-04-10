import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JobOffer} from "../Model/JobOffer";



@Injectable({
  providedIn: 'root'
})
export class OffreService {
  public host:string="http://localhost:8084";

  constructor(private http:HttpClient) { }

  public getOffres(){

    return this.http.get(this.host+"/offres-emploi/all");
  }

  postuler(idCandidat: number, idOffre: number) {
    return this.http.post(this.host+"/candidat/"+idCandidat+"/postuler/"+idOffre,null);
  }

  addJobOffer(jobOffer: any): Observable<any> {
    return this.http.post(this.host, jobOffer);
  }
  public getOffer(id: any)  {
    console.log('URL:', this.host+"/offres-emploi/"+id); // Debugging log to check the URL

    return this.http.get<JobOffer>(this.host+"/offres-emploi/"+id);


  }
  searchOffresEmploi(ville: string, niveauEtude: string, domaine: string, keyName: string)   {
    let url = `${this.host}/offres-emploi/search`;

    if (ville && niveauEtude && domaine && keyName) {
      url += `/ville-niveauEtude-domaine-keyName?ville=${ville}&niveauEtude=${niveauEtude}&domaine=${domaine}&keyName=${keyName}`;
    } else if (ville && niveauEtude && domaine) {
      url += `/ville-niveauEtude-domaine?ville=${ville}&niveauEtude=${niveauEtude}&domaine=${domaine}`;
    } else if (ville && domaine && keyName) {
      url += `/ville-domaine-keyName?ville=${ville}&domaine=${domaine}&keyName=${keyName}`;
    } else if (ville) {
      url += `/ville?ville=${ville}`;
    } else if (niveauEtude) {
      url += `/niveauEtude?niveauEtude=${niveauEtude}`;
    } else if (domaine) {
      url += `/domaine?domaine=${domaine}`;
    } else if (keyName) {
      url += `/keyName?keyName=${keyName}`;
    }

    return this.http.get(url);
  }
}
