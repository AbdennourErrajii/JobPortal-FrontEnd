import { Component } from '@angular/core';
import {AuthenticationService} from "../../Services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent {

  constructor(public authService: AuthenticationService, private router:Router) {
  }
  public handlelogout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl('/login')
      },
    })
  }
}
