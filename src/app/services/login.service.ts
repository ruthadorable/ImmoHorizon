import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  onLogin(request:LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:8080/api/auth/login', request);
  }
}
