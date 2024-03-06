import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CandidatureService {
  public host: string = "http://localhost:8084";

  constructor(private http: HttpClient) {
  }

  public getOffresPostuler(id: number) {
    return this.http.get(this.host+"/candidat/"+id+"/offrePostuler");
  }

  public deletCandidature(id:number){
    return this.http.delete(this.host+"/candidat/delete/candidature/"+id);
  }

}
