import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/AdminServices/admin-service';
interface Admin {
  username: string;
  role: string;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styles: ``
})
export class AdminDashboard {
  admins: Admin[] = [];
  newAdminUsername: string = '';
  newAdminPassword: string = '';
  constructor(private authService: AuthService, private adminService: AdminService) {}
  ngOnInit(): void {
    this.loadAdmins();
  }
  getRole() {
    return this.authService.getRole();
  }
  loadAdmins() {
    this.adminService.getAdmins().subscribe({
      next: (data) => {
        this.admins = data;
      },
      error: (error) => {
        console.error('Error loading admins', error);
      }
    });
  }
  createAdmin() {
    this.adminService.createAdmin(this.newAdminUsername, this.newAdminPassword).subscribe({
      next: (response) => {
        console.log('Admin created successfully', response);
        this.admins.push({ username: this.newAdminUsername, role: 'Admin' });
        this.newAdminUsername = '';
        this.newAdminPassword = '';
      },
      error: (error) => {
        console.error('Error creating admin', error);
      }
    });
  }
  deleteAdmin(admin: Admin) {
    this.adminService.deleteAdmin(admin.username).subscribe({
      next: (response) => {
        console.log('Admin deleted successfully', response);
        this.admins = this.admins.filter(a => a !== admin);
      },
      error: (error) => {
        console.error('Error deleting admin', error);
      }
    });
  }
}
