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
    // mock login for demo
    // const role = username.toLowerCase() === 'admin' ? 'Admin' : 'Customer';
    // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiaG9sYSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkN1c3RvbWVyIiwiZXhwIjoxNzU5OTA1NTk1LCJpc3MiOiJNaW5pTWFydEFQSVNlcnZlciIsImF1ZCI6Ik1pbmlNYXJ0Q2xpZW50In0.Hl_hji00CAMdEPyog6Mcv9PsQDWCN1un6z4uRbe9gn0"
    // this.setToken(token);
    // return new Observable<{ token: string }>(observer => {
    //   observer.next({ token });
    //   observer.complete();
    // });
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
    const username = p['unique_name'] ?? p['name'] ?? p['sub'] ?? '';
    const role = p['role'] ?? p['roles'] ?? p['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ?? 'Customer';
    this.user.set({ username, role });
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
