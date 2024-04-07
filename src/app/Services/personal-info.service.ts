import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  public host: string = "http://localhost:8084";

  constructor(private http: HttpClient) {
  }

  public getCandidat(id: number) {
    return this.http.get(this.host+"/candidat/"+id);
  }



}
