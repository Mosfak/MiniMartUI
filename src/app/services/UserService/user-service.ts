import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  id: string;
  userName: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  apiUrl = 'https://localhost:7276/api/Users/GetUserByUsername';
  constructor(private http: HttpClient, private auth: AuthService) {}
  userId: number = 0;
  // Fetch user details by username
  getUserByUserName(username: string) {
    return this.http.get<User>(`${this.apiUrl}/?username=${username}`);
  }
  getUserId(): Observable<number> {
    const user = this.auth.getUser();
    var username = user?.username || '';
    return this.getUserByUserName(username).pipe(
      map((userData: User) => {
        this.userId = parseInt(userData.id, 10);
        return this.userId;
      })
    );
  } 
}

