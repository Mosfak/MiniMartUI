// src/app/services/auth.service.ts
import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  name?: string;
  role?: string;
  exp?: number;
  [k: string]: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'MinimartToken';
  // signal containing { username, role } or null
  user = signal<{ username: string; role: string } | null>(null);
  isLoggedIn = computed(() => !!this.user());
  isAdmin = computed(() => this.user()?.role === 'Admin');

  constructor(private http: HttpClient, private router: Router) {
    const tok = localStorage.getItem(this.tokenKey);
    if (tok) this.setToken(tok);
  }

  login(username: string, password?: string): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>('https://localhost:7276/api/auth/login', { username, password })
      .pipe(tap(res => this.setToken(res.token)));
    
  }

  private parseJwt(token: string): JwtPayload | null {
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken as JwtPayload;
  }

  private setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
    const p = this.parseJwt(token);
    if (!p) {
      this.user.set(null);
      return;
    }

    // try several possible claim names for username/role
    let username = '';
    if (p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']) {
      username = p['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    } 

    let role = 'Default';
    if (p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
      role = p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    }
    this.user.set({ username, role });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  getUser(): { username: string; role: string } | null {
    return this.user();
  }

  logout(redirect = true) {
    localStorage.removeItem(this.tokenKey);
    this.user.set(null);
    if (redirect) this.router.navigate(['/login']);
  }

  // helper to get role quickly
  getRole(): string | null {
    return this.user()?.role ?? null;
  }

  // check token expiry (exp in seconds)
  tokenExpired(): boolean {
    const t = this.getToken();
    if (!t) return true;
    const p = this.parseJwt(t);
    if (!p || !p.exp) return true;
    const now = Math.floor(Date.now() / 1000);
    return p.exp < now;
  }
}
