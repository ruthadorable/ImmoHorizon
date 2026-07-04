import { HttpClient } from '@angular/common/http';
import { Inject, Injectable ,PLATFORM_ID,inject} from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../../models/login-request';
import { LoginResponse } from '../../../models/login-response';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url='http://localhost:8080/api/auth'
  private http=inject(HttpClient);
 

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

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

  public getRoles():null |string{
    return  localStorage.getItem('roles');
  }

  public setToken(jwtToken: string){
    localStorage.setItem('jwtToken',`${jwtToken.slice(7)}`);
  }

  public getToken():string|null{
  return localStorage.getItem('jwtToken');
  }

  public clear()
  {
    localStorage.clear();
  }
  logout()
  {
    localStorage.removeItem("jwtToken");
    this.clear();
    return true;
  }
}
