import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { environment } from '../../environment/environment.prod';
import Cookies from 'js-cookie';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = inject(Auth)
  private router = inject(Router)

  constructor(private http: HttpClient) { }

  register({ email, password }: any) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({ email, password }: any) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    this.router.navigate(['/login'])
    return signOut(this.auth);
  }

  verifyDocument() {
    return this.http.get(environment.path + "verifyDocument?document=" + this.document)
  }

  get document() {
    return Cookies.get("document") as string;
  }

  set document(document: string) {
    Cookies.set("document", document, { expires: 7 })
  }
}
