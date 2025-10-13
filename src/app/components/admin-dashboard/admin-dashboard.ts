import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
interface Admin {
  username: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styles: ``
})
export class AdminDashboard {
  admins: Admin[] = [
    { username: 'admin1', role: 'Admin' },
    { username: 'admin2', role: 'Admin' }
  ];
  newAdminUsername: string = '';
  constructor(private authService: AuthService) {}
  getRole() {
    return this.authService.getRole();
  }
  createAdmin() {
    console.log('Create Admin clicked'); 
  }
  deleteAdmin(admin: Admin) {
    console.log('Delete Admin clicked', admin); 
  }
}
