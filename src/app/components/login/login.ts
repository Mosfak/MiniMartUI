import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  customerLogin() {
    // Implement customer login logic here
    console.log('Customer login:', this.customerName);
    //route to products page
    window.location.href = '/products';
    
  }

  adminLogin() {
    // Implement admin login logic here
    console.log('Admin login:', this.adminUsername, this.adminPassword);
    window.location.href = '/products';

  }
}