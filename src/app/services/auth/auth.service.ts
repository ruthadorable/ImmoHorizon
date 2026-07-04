import { Injectable, signal } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUser = signal<User | null>(null);

  user = this.currentUser.asReadonly();

  setUser(user: User) {
    this.currentUser.set(user);
  }

  clearUser() {
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  hasRole(role: string): boolean {
    return this.currentUser()?.roles?.includes(role) ?? false;
  }

  hasAnyRole(roles: string[]): boolean {
    const userRoles = this.currentUser()?.roles ?? [];

    return roles.some(role => userRoles.includes(role));
  }
}