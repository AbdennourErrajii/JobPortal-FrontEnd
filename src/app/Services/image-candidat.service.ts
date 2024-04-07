import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageCandidatService {
  private apiUrl = 'http://localhost:8084'; // replace with your API URL
  constructor(private http: HttpClient) { }




  createImage(image: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/imageCandidat`, image);
  }
}
