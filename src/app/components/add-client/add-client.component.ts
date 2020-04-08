import { Component, OnInit } from '@angular/core';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {AuthClientService} from '../../services/auth-client.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0,
    user: ''
  };
  constructor(private clientService: ClientService,
              private router: Router,
              private flashMessages: FlashMessagesService,
              private authService: AuthClientService) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      this.client.user = auth.uid;
    });
  }
  onSubmit() {
    this.clientService.addClient(this.client);
    this.flashMessages.show('Client added successfully !', { cssClass : 'alert alert-primary', timeout: 2000});
    return this.router.navigate(['/']);
  }
}
