import { Injectable } from '@angular/core';
import {AppUser} from "../Model/user.model";
import {Observable, of, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import * as http from "http";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public host:string="http://localhost:8084";
  users: AppUser[] =[];
  employers:AppUser[]=[];
  authenticatedUser:AppUser|undefined;
  constructor(private http:HttpClient) {
    this.getCandidats().subscribe(data=>{
      this.users=data;
    })
      this.getEmployers().subscribe(data=>{
        this.employers=data;
      })
  }

  public getCandidats(): Observable<AppUser[]> {
    // Utilisez le retour de la méthode get avec la spécification du type générique
    return this.http.get<AppUser[]>(this.host + "/candidat/all");
  }

    public getEmployers(): Observable<AppUser[]> {
        // Utilisez le retour de la méthode get avec la spécification du type générique
        return this.http.get<AppUser[]>(this.host + "/employeurs");
    }




  public login(email:string,password:string,role:string):Observable<AppUser>{
    if(role=='candidate'){
        //let appUser=this.users.find(u=>u.username==username && u.password==password);
        let appUser=this.users.find(u=>u.email==email);
        if(!appUser) return throwError(()=>new Error("User Not Found !"));
        if(appUser.motDePasse!=password) return throwError(()=>new Error("Wrong Password !"));
        return of(appUser);
    }else {
        //let appUser=this.users.find(u=>u.username==username && u.password==password);
        let appUser=this.employers.find(u=>u.email==email);
        if(!appUser) return throwError(()=>new Error("User Not Found !"));
        if(appUser.motDePasse!=password) return throwError(()=>new Error("Wrong Password !"));
        return of(appUser);
    }

  }

  public authenticateUser(appUser:AppUser):Observable<boolean>{
    this.authenticatedUser=appUser;
    localStorage.setItem("authUser",JSON.stringify({id:appUser.id,email:appUser.email,role:appUser.role,jwt:"WT_TOKEN"}));
    console.log(appUser.role);
    return of(true);
  }

  public isCandidat():boolean{
    return this.authenticatedUser!.role.includes("candidate");
  }
  public isEmployeur():boolean{
    return this.authenticatedUser!.role.includes("employer");
  }

  public isAuthenticated():boolean{
    return this.authenticatedUser!=undefined;
  }

  public logout():Observable<boolean>{
    this.authenticatedUser=undefined;
    localStorage.removeItem("authUser");
    return of(true);
  }
}
