import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable ,inject} from '@angular/core';
import { Observable,  } from 'rxjs';
import { Article } from '../../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = 'http://localhost:8080/api/blog';
  private http= inject(HttpClient);

  constructor() { }

  getAllArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.apiUrl+"/all");
  }

  getRecentArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.apiUrl+"/recent");
  }

  getArticleById(id:number): Observable<Article>{
    return this.http.get<Article>(`${this.apiUrl}/${id}`); 
  }

  search(keyword:string): Observable <Article[]>{
    return this.http.post<Article[]>(this.apiUrl+"/search",{
        params: {
          keyword
        }
      });
  }

  getByCategory(category:string):Observable<Article[]>{
    return this.http.get<Article[]>( `${this.apiUrl}/category/${category}`);
  }

  createArticle(article: any): Observable<Article> {
  return this.http.post<Article>(this.apiUrl, article);
  }

  updateArticle(id: number, article: any): Observable<Article> {
  return this.http.put<Article>(
    `${this.apiUrl}/${id}`,
    article
  );
  }
  
  deleteArticle(id: number): Observable<void> {
    const token = localStorage.getItem('token');
    console.log('Token retrieved from localStorage:', token);
  return this.http.delete<void>(
    `${this.apiUrl}/${id}`,{
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }
  )
  }

}
