import { Component, inject } from '@angular/core';
import { LoginComponent } from "../login/login.component";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../Services/account.service';
import { AuthenticationService } from '../../Services/authentication.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { error } from 'console';
import { User } from '../../Models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [LoginComponent,RouterLink,CommonModule,BsDropdownModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  model:any={}
  
  loggedIn:boolean=false;

  public accountService=inject(AccountService)
  private authService=inject(AuthenticationService)

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe((status) => {
      this.loggedIn = status;
    });
  }

  logout()
  {
    this.accountService.logout();
    this.authService.logout();
  }

}
