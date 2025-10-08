import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styles: ``
})
export class Login {
  isAdmin: boolean = false;
  customerName: string = '';
  adminUsername: string = '';
  adminPassword: string = '';
  constructor(private authService: AuthService, private router: Router) {}

  
  customerLogin() {
    // Implement customer login logic here
    console.log('Customer login:', this.customerName);
    //route to products page
    this.authService.login(this.customerName).subscribe({
      next: res => {
        console.log('Login successful', res);
        this.router.navigate(['/products']);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
    console.log("token: ", this.authService.getToken());
    
  }

  adminLogin() {
    // Implement admin login logic here
    console.log('Admin login:', this.adminUsername, this.adminPassword);
    this.authService.login(this.adminUsername, this.adminPassword).subscribe({
      next: res => {
        console.log('Login successful', res);
        this.router.navigate(['/products']);
      },
      error: err => {
        console.error('Login failed', err);
      }
    });
    console.log("token: ", this.authService.getToken());

  }
}