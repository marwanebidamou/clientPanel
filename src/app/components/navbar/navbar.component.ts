import { Component, OnInit } from '@angular/core';
import {AuthClientService} from '../../services/auth-client.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {element} from 'protractor';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  userLoggedIn: string;
  constructor(private authService: AuthClientService,
              private flashMessage: FlashMessagesService,
              private router: Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.userLoggedIn = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  onLogOut() {
    this.isLoggedIn = false;
    this.authService.logOut();
    this.flashMessage.show('Logout successfully', {
      cssClass: 'alert-warning'
    });
    this.router.navigate(['/login']);
  }

}
