import { Injectable , inject} from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../../models/register-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private authUrl=`${environment.apiUrl}/api/auth`;
  private http=inject(HttpClient);
  constructor(http: HttpClient) { }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post<string>(
      `${this.authUrl}/register`,
      request
    );
  }
}
