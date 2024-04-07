import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SignupService {
    private apiUrl = 'http://localhost:8084'; // Mettez votre URL de l'API ici

    constructor(private http: HttpClient) { }

    registerCandidate(candidateData: any): Observable<any> {
      console.log(candidateData);
        return this.http.post<any>(`${this.apiUrl}/candidat/add`, candidateData);
    }

    registerEmployer(employerData: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/employeur/add`, employerData);
    }


}
