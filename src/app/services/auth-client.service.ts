import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {FirebaseApp} from '@angular/fire';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  constructor(public auth: AngularFireAuth) { }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.signInWithEmailAndPassword(email, password)
        .then((userData) => resolve(userData), (error) => reject(error));
    });
  }

  register(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.auth.createUserWithEmailAndPassword(email, password)
        .then((userData) => resolve(userData), (error) => reject(error));
    });
  }

  loginWithGoogle() {
    return new Promise((resolve, reject) => {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((userData) => resolve(userData), (error) => reject(error));
    });
  }

  getAuth() {
    return this.auth.authState.pipe(map(auth => auth));
  }

  logOut() {
    this.auth.signOut();
  }
}
