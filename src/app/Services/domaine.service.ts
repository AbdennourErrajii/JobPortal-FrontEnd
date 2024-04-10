import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DomaineService {
  private apiUrl1 = 'http://localhost:8084/domaines'; // replace with your API URL
  private apiUrl = 'http://localhost:8084'; // replace with your API URL


  constructor(private http: HttpClient) { }

  createDomaine(domaine: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/domaines`, domaine);
  }

  getDomaine(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl1}/${name}`);
  }

  public getDomaines(){
    return this.http.get(this.apiUrl+"/domaines");
  }
}
