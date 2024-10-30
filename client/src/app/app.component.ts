import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './Components/nav/nav.component';
import { LoginComponent } from "./Components/login/login.component";
import {FormsModule} from "@angular/forms"
import { AccountService } from './Services/account.service';
import { User } from './Models/user';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { HomeComponent } from "./Components/home/home.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavComponent, LoginComponent, FormsModule, HomeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
      const user: User = JSON.parse(localStorage.getItem('user') as string);
      this.accountService.setCurrentUser(user);
  }
}
