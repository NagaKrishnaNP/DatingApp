import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { response } from 'express';
import { map } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = 'http://localhost:5051/api/'

  private currentUserSource = new ReplaySubject<User | null>(1)
  currentUser$ = this.currentUserSource.asObservable()

  private http = inject(HttpClient)

  login(model: any) {
    return this.http.post<User>(this.baseUrl + 'createaccount/login', model).pipe(
      map((response: User) => {
        const user = response
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
      }));
  }

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'createaccount/login', model).pipe(
      map((response: User) => {
        const user = response
        if (user) {
          localStorage.setItem('user', JSON.stringify(user))
          this.currentUserSource.next(user);
        }
      }));
  }

  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
