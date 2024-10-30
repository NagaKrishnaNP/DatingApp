import { Component, inject, OnInit } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { AccountService } from '../../Services/account.service';
import { error } from 'console';
import { AuthenticationService } from '../../Services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  model:any={}
  loggedIn:boolean=false

  private accountService=inject(AccountService)
  private authService=inject(AuthenticationService)

  ngOnInit(): void {
    
  }

  login()
  {
    this.accountService.login(this.model).subscribe((result: any)=>{
      console.log(result);
      this.authService.login();
    },(error: any)=>{
      console.log(error)
    })
  }

  logout()
  {
    this.loggedIn=false
  }

}
