import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthenticationService} from "../../Services/authentication.service";
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";
// @ts-ignore
import $ from "jquery";

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrl: './head.component.css'
})
export class HeadComponent implements OnInit {
    authUserString = localStorage.getItem('authUser');
    authUser: any;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,public authService: AuthenticationService, private router:Router) {
  }
  ngOnInit(): void {
      if (this.authUserString) {
          // Parsez la chaîne JSON pour obtenir l'objet
          this.authUser = JSON.parse(this.authUserString);
      }
    if (isPlatformBrowser(this.platformId)) {
      $("#btn").click(function () {
        $(".sidebar").toggleClass("open");
        menuBtnChange();
      });

      $(".bx-search").click(function () {
        $(".sidebar").toggleClass("open");
        menuBtnChange();
      });

      function menuBtnChange() {
        if ($(".sidebar").hasClass("open")) {
          $("#btn").removeClass("fa-bars").addClass("fa-ellipsis-v");
        } else {
          $("#btn").removeClass("fa-ellipsis-v").addClass("fa-bars");
        }
      }
    }
  }
  public handlelogout() {
    this.authService.logout().subscribe({
      next: (data) => {
        this.router.navigateByUrl('/login')
      },
    })
  }
}
