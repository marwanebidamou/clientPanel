import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id: string;
  client: Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  };
  showBalance = false;
  constructor(
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
    private flashMessages: FlashMessagesService
    ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.clientService.getClient(this.id).subscribe(client => {
      this.client = client;
    });
  }

  onSubmit() {
    this.client.id = this.id;
    this.clientService.updateClient(this.client);
    this.showBalance = false;
    this.flashMessages.show('Balance updated !', { cssClass: 'alert-warning', timeout: 3000});
  }

  deleteClient() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(this.id);
        this.flashMessages.show('Client deleted !', { cssClass: 'alert-danger', timeout: 3000});
        return this.router.navigate(['/']);
      }
    });
  }
}
