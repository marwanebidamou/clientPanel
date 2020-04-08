import { Component, OnInit } from '@angular/core';
import {AuthClientService} from '../../services/auth-client.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email: string;
  password: string;
  constructor(private authService: AuthClientService,
              private router: Router,
              private flashMessages: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.register(this.email, this.password)
      .then(register => {
          this.flashMessages.show('You are logged !', {cssClass: 'alert-success', timeOut: 3000 });
          this.router.navigate(['/']);
      })
      .catch(error => {
        this.flashMessages.show(error.message, {cssClass: 'alert-warning', timeOut: 6000 });
      });
  }

}
