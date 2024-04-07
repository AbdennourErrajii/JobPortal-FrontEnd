import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CvCandidatService {
    private apiUrl = 'http://localhost:8084'; // replace with your API URL
    constructor(private http: HttpClient) { }

  createCv(cv: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/Cv`, cv);
  }
  public getCvByCandidatId(id: number) {
    return this.http.get(this.apiUrl+"/Cv/candidat/"+id);
  }
}
