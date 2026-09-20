import { Injectable , inject} from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../../../models/register-request';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
<<<<<<< HEAD
  private authUrl=`${environment.apiUrl}/api/auth`;
=======
  //local endpoint
  //private authUrl='http://localhost:8080/api/auth';
  //aws backend endpoint
  private authUrl = 'http://ec2-44-192-116-114.compute-1.amazonaws.com:3030/api/auth';

>>>>>>> ea44efe56abb81482fb45ab79a6b302d8a2da318
  private http=inject(HttpClient);
  constructor(http: HttpClient) { }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post<string>(
      `${this.authUrl}/register`,
      request
    );
  }
}
