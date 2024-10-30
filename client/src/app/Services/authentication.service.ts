import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedInSource = new BehaviorSubject<boolean>(false);  // Observable to hold the logged-in state
  loggedIn$ = this.loggedInSource.asObservable();  // Observable for components to subscribe to

  constructor() {}

  // Method to log in
  login() {
    this.loggedInSource.next(true);  // Update the logged-in state to true
  }

  // Method to log out
  logout() {
    this.loggedInSource.next(false);  // Update the logged-in state to false
  }

  // To get the current login status
  isLoggedIn(): boolean {
    return this.loggedInSource.value;
  }
}
