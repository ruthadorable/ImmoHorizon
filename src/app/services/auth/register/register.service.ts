import { Injectable , inject} from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../../models/register-request';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  //local endpoint
  //private authUrl='http://localhost:8080/api/auth';
  //aws backend endpoint
  private authUrl = 'http://ec2-44-192-116-114.compute-1.amazonaws.com:3030/api/auth';

  private http=inject(HttpClient);
  constructor(http: HttpClient) { }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post<string>(
      `${this.authUrl}/register`,
      request
    );
  }
}
