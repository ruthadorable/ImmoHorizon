import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Bien } from '../../models/bien.model';
@Injectable({
  providedIn: 'root'
})
export class BienService {

   private apiUrl = 'http://localhost:8080/api/biens';

  constructor(private http: HttpClient) {}

  getAllProperties(): Observable<Bien[]> {
    return this.http.get<Bien[]>(this.apiUrl+'/all');
  }

  creerBien(data: any, files: File[]) {

  const formData = new FormData();

  formData.append(
    'property',
    new Blob(
      [JSON.stringify(data)],
      { type: 'application/json' }
    )
  );

  files.forEach(file => {
    formData.append('images', file);
  });

  return this.http.post(
    `${this.apiUrl}/create`,
    formData
  );
}
  updateBien(bien: Bien): Observable<Bien> {
    return this.http.put<Bien>(this.apiUrl+'/update', bien);
  }
  deleteBien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
