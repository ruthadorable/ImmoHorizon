import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthService } from '../auth/user-auth.service';
import { MOCK_USER } from '../../models/mock-user';
@Injectable({
  providedIn: 'root'
})

export class UserService{
    

  private userCopy!:User;
  private baseUrl!:string;
  private addUserUrl!: string;
  private getUserUrl!:string;
  private updateUserUrl!:string;
  private deleteUserUrl!:string;
  private PATH_OF_API = 'http://localhost:8080';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  headers = new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('X-API-TOKEN', localStorage.getItem('jwtToken') || '');

  constructor(private httpclient: HttpClient,private userAuthService: UserAuthService) 
  {    
    this.baseUrl="http://localhost:8080/api/user";
    this.addUserUrl="http://localhost:8080/api/user/add";
    this.getUserUrl="http://localhost:8080/api/user/all";
    this.updateUserUrl="http://localhost:8080/api/user/update/";
    this.deleteUserUrl="http://localhost:8080/api/user/delete/";

    

  }


  public login(user : User):Observable<any> {
    console.log(user);
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', user, {headers: this.headers});
  }

  public getRole(): string {
  
    var role = localStorage.getItem('role');
    if (role == null || role == undefined) {
      role = '';
    }
    return role;
  }


  public registerUser(user: User):Observable<any>{
    return this.httpclient.post<any>(this.PATH_OF_API+'/registerNewUser',user);
    
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }
  


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles:any): boolean{
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
      return isMatch;
    }else {return isMatch;}
  }

  public setData(user :User)
  {
    this.userCopy=user;

  }
  public getData():User
  {
    return this.userCopy;
  }
  public getUser(): Observable<User[]>{
    return this.httpclient.get<User[]>(`${this.getUserUrl}`);
  }

  public postUser(user: User): Observable<User> {
    return this.httpclient.post<User>(`${this.addUserUrl}`, user);
  }

  public updateUser(user: User): Observable<User>{
    return this.httpclient.put<User>(`${this.updateUserUrl}${user.id}`,user);
  }
  public getUserById(id:number): Observable<User>{
    return this.httpclient.get<User>(`${this.baseUrl}/id`);
  }
  public getUserByFind(id:number):any{
    return MOCK_USER.find( (x)=> x.id === id);
  }
  public deleteUser(id:number,user:User): Observable<User>{
    return this.httpclient.delete<User>(`${this.deleteUserUrl}`+id);
  }
    
}