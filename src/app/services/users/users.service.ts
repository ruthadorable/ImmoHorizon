import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateUserRequest } from '../../models/create-user-request.model';
import { UpdateUserRequest } from '../../models/update-user-request.model';
import { User } from '../../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly http = inject(HttpClient);

  private PATH_OF_API = `${environment.apiUrl}`;

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.PATH_OF_API}/all`);
  }

  // Get a user by ID
  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.PATH_OF_API}/${id}`);
  }

  // Create a user
  createUser(user: CreateUserRequest): Observable<User> {
    return this.http.post<User>(this.PATH_OF_API, user);
  }

  // Update a user
  updateUser(
    id: number,
    user: UpdateUserRequest
  ): Observable<User> {
    return this.http.put<User>(`${this.PATH_OF_API}/${id}`, user);
  }

  // Delete a user
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.PATH_OF_API}/${id}`);
  }
}
