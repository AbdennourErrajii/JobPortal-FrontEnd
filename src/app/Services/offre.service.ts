import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

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
}
