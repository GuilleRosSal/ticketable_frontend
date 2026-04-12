import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { AuthUser, LoginCredentials, RegisterData } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseURL: string = `${environment.backendUrl}/auth`;

  login(credentials: LoginCredentials): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.baseURL}/login`, credentials);
  }

  register(user: RegisterData): Observable<AuthUser> {
    return this.http.post<AuthUser>(`${this.baseURL}/register`, user);
  }
}
