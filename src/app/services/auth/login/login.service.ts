import { HttpClient } from '@angular/common/http';
import { Inject, Injectable ,PLATFORM_ID,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../../models/login-request';
import { LoginResponse } from '../../../models/login-response';
import { isPlatformBrowser } from '@angular/common';
import { Route, Router } from '@angular/router';
import { signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url='http://localhost:8080/api/auth'
  private http=inject(HttpClient);
  private route= inject(Router);
  public  role = signal<string | null>(null);
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
  if (isPlatformBrowser(this.platformId)) {
    this.role.set(localStorage.getItem('role'));
  }
}
  onLogin(request:LoginRequest):Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.url}/login`, request);
  }
 

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('token');
    }

    return false;
  }
   public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public setToken(jwtToken: string){
    localStorage.setItem('jwtToken',`${jwtToken.slice(7)}`);
  }

  public getToken():string|null{
  return localStorage.getItem('jwtToken');
  }

  public getUsername():string|null{
    return localStorage.getItem('username');
  }

  public clear()
  {
    localStorage.clear();
  }
  logout()
  {
    localStorage.removeItem("jwtToken");
    this.clear();
    this.route.navigate(['/home'])
    return true;
  }
}
