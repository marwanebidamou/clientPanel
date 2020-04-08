import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable, pipe} from 'rxjs';
import { Client } from '../models/client.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  clientCollection: AngularFirestoreCollection<Client>;
  doc: AngularFirestoreDocument;
  constructor(private afs: AngularFirestore) {
    this.clientCollection = afs.collection<Client>('clients');
  }

  getClients(user: string): Observable<Client[]> {
    return this.afs.collection('clients', ref => ref.where('user', '==', user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addClient(client: Client) {
    this.clientCollection.add(client);
  }

  getClient(id: string): Observable<Client> {
    return this.clientCollection.doc(id).valueChanges();
  }

  updateClient(client: Client) {
    this.doc = this.clientCollection.doc(client.id);
    this.doc.update(client);
  }

  deleteClient(id: string) {
    this.doc = this.clientCollection.doc(id);
    this.doc.delete();
  }
}
