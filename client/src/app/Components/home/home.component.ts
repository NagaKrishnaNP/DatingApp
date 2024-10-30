import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  registerMode=false
  users:any
  private http=inject(HttpClient)
  
  ngOnInit(): void {
    this.getAllUsers()
  }

  registerToggle()
  {
    this.registerMode=!this.registerMode
  }

  getAllUsers() {
    
    this.http.get('http://localhost:5051/api/users').subscribe(
      result => {
        this.users = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelRegisterMode(event:boolean)
  {
    this.registerMode=event
  }
}
