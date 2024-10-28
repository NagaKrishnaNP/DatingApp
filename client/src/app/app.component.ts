import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected styleUrls
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  // You can use either constructor injection or the new Angular inject method.
  // For consistency with standard Angular practice, constructor injection is recommended.
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllUsers();
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
}
