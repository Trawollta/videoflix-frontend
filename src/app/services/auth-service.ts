import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl + 'auth/';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}register/`, user);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(`${this.baseUrl}login/`, credentials).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('authToken', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  sendPasswordResetLink(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}password-reset/`, { email });
  }

  resetPassword(uid: string, token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.baseUrl}reset-password-confirm/${uid}/${token}/`, {
      new_password1: newPassword,
      new_password2: newPassword
    });
  }

  activateAccount(uid: string, token: string): Observable<any> {
    return this.http.get(`${this.baseUrl}confirm-email/${uid}/${token}/`);
  }
}
