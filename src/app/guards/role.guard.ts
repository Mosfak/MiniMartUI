// src/app/guards/role.guard.ts
import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, Router
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // required roles passed in route data
    const roles: string[] = route.data['roles'];
    // if not logged in -> redirect to login
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }
    if (!roles || roles.length === 0) return true; // no role restriction

    const userRole = this.auth.getRole();
    console.log('RoleGuard: user role', userRole, 'required roles:', roles);
    if (userRole && roles.includes(userRole)) {
      return true;
    }

    // not allowed -> go home or show forbidden
    this.router.navigate(['/']);
    return false;
  }
}
