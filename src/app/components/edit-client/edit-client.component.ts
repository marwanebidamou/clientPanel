import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../models/client.model';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    balance: 0,
  };
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe( client => {
      this.client = client;
    });
  }

  onSubmit() {
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.flashMessages.show('Client updated successfully !', { cssClass: 'alert-success', timeout: 3000});
    return this.router.navigate(['/']);
  }

}
