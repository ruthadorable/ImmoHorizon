import { HttpClient } from '@angular/common/http';
import { Inject, Injectable ,PLATFORM_ID,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../../models/login-request';
import { LoginResponse } from '../../../models/login-response';
import { isPlatformBrowser } from '@angular/common';
import { Route, Router } from '@angular/router';
import { signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

private url = `${environment.apiUrl}/api/auth`;

  private http = inject(HttpClient);
  private route = inject(Router);

  private isBrowser: boolean;

  // Reactive application state
  public role = signal<string | null>(null);
  public username = signal<string | null>(null);
  public isAuthenticated = signal<boolean>(false);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.role.set(localStorage.getItem('role'));
      this.username.set(localStorage.getItem('username'));
      this.isAuthenticated.set(!!localStorage.getItem('jwtToken'));
    }
  }

  onLogin(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.url}/login`,
      request
    );
  }

  // Store authentication information after successful login
  setSession(
    jwtToken: string,
    username: string,
    roles: string[]
  ): void {
    if (!this.isBrowser) return;

    // Support both "Bearer xxx" and raw JWT values
    const token = jwtToken.startsWith('Bearer ')
      ? jwtToken.substring(7)
      : jwtToken;

    localStorage.setItem('jwtToken', token);
    localStorage.setItem('username', username);
    localStorage.setItem('roles', JSON.stringify(roles));


    // Update Angular signals immediately
    this.username.set(username);
    this.isAuthenticated.set(true);
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated();
  }

  setRoles(roles: string[]): void {
    if (!this.isBrowser) return;

    localStorage.setItem('roles', JSON.stringify(roles));

    const primaryRole = roles.length > 0 ? roles[0] : null;

    this.role.set(primaryRole);

    if (primaryRole) {
      localStorage.setItem('role', primaryRole);
    }
  }

  getRoles(): string[] | null {
    if (!this.isBrowser) return null;

    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : null;
  }

  setToken(jwtToken: string): void {
    if (!this.isBrowser) return;

    const token = jwtToken.startsWith('Bearer ')
      ? jwtToken.substring(7)
      : jwtToken;

    localStorage.setItem('jwtToken', token);
    this.isAuthenticated.set(true);
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;

    return localStorage.getItem('jwtToken');
  }

  getUsername(): string | null {
    if (!this.isBrowser) return null;

    return localStorage.getItem('username');
  }

  clear(): void {
    if (!this.isBrowser) return;

    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('roles');

    sessionStorage.clear();

    // Reset reactive state
    this.username.set(null);
    this.role.set(null);
    this.isAuthenticated.set(false);
  }

  logout(): boolean {
    this.clear();
    this.route.navigate(['/home']);
    return true;
  }
}
