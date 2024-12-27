import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule],
})
export class LoginComponent {
  registerMode = false;
  constructor(private router: Router, private http: HttpClient) {}

  credentials = {
    email: '',
    password: '',
    username: '',
  };

  register() {
    console.log('Login successful', this.credentials);
    if (
      this.credentials.email &&
      this.credentials.password &&
      this.credentials.username
    ) {
      console.log('Login successful', this.credentials);
      this.http
        .post('http://localhost:5006/user/auth/register', this.credentials)
        .subscribe((response: any) => {
          if (response.statusCode === 200) {
            this.registerMode = false;
          }
          console.log(response);
        });
      // Add your login logic here (e.g., API call)
    }
  }

  login() {
    this.http
      .post('http://localhost:5006/user/auth/login', this.credentials)
      .subscribe((response: any) => {
        if (response.statusCode === 200) {
          console.log(response.data.token);

          localStorage.setItem('authToken', response.data.token);
          this.router.navigate(['/']);
        }
        console.log(response);
      });
    // Placeholder logic for authentication
    // alert('Logged in!');
    // this.router.navigate(['/todo']);
  }
}
