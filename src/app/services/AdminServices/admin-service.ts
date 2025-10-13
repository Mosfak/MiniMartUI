import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'https://localhost:7276/api/Users/admin';
  constructor(private http: HttpClient) { }
  createAdmin(username: string, password: string) {
    return this.http.post(this.apiUrl, { username, password });
  }
  deleteAdmin(username: string) {
    return this.http.delete(`${this.apiUrl}/${username}`);
  }
  getAdmins() {
    return this.http.get<{ username: string; role: string }[]>(this.apiUrl);
  }
}
