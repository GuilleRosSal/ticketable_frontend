import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthUser } from '../models/auth.model';
import {
  EmailsResponse,
  ProfileData,
  UpdatePassword,
  UpdatePasswordResponse,
  User,
} from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseURL = `${environment.backendUrl}/user`;

  getClientEmails(): Observable<EmailsResponse> {
    return this.http.get<EmailsResponse>(`${this.baseURL}/emails`);
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/${id}`);
  }

  updateProfileData(id: number, profileData: ProfileData): Observable<AuthUser> {
    return this.http.put<AuthUser>(`${this.baseURL}/${id}/profile-data`, profileData);
  }

  updatePassword(id: number, updatePassword: UpdatePassword): Observable<UpdatePasswordResponse> {
    return this.http.put<UpdatePasswordResponse>(`${this.baseURL}/${id}/password`, updatePassword);
  }
}
