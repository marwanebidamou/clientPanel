import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {Client} from '../../models/client.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import Swal from 'sweetalert2';
import {AuthClientService} from '../../services/auth-client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[];
  searchClients: Client[];
  total = 0;
  constructor(
    private clientService: ClientService,
    private flashMessages: FlashMessagesService,
    private authService: AuthClientService
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      this.clientService.getClients(auth.uid).subscribe(clients => {
        this.searchClients = this.clients = clients;
        this.total = this.getTotal();
      });
    });
  }

  getTotal(): number {
    if (this.clients) {
      return this.clients.reduce((total, client) => {
        return total +   +client.balance;
      }, 0);
    }
  }

  deleteClient(id: string) {
    Swal.fire({
      title: 'Are you sure you want to delete this client?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.clientService.deleteClient(id);
        Swal.fire(
          'Deleted!',
          'Client has been deleted.',
          'success'
        );
      }
    });
  }

  search(query: string) {
    this.searchClients = (query) ?
      this.clients
        .filter(client => (client.firstName + client.lastName + client.email + client.phone).toLowerCase().includes(query.toLowerCase()))
      : this.clients;
  }

}
