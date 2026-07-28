import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Bien } from '../../models/bien.model';
import { CriteresRecherche } from '../../models/criteresRecherche.model';
@Injectable({
  providedIn: 'root'
})
export class BienService {

   private apiUrl = 'http://localhost:8080/api/biens';

  constructor(private http: HttpClient) {}


  getPropertyById(id:number): Observable<Bien>{
    return this.http.get<Bien>(this.apiUrl+'/'+id);
  }
  getBiensAvendre(): Observable<Bien>{
    return this.http.get<Bien>(this.apiUrl+'/type/avendre');
  }
 getBiensAlouer(): Observable<Bien>{
    return this.http.get<Bien>(this.apiUrl+'/type/alouer');
  }


 searchProperties(criteria: CriteresRecherche): Observable<Bien[]> {
    return this.http.post<Bien[]>(
      `${this.apiUrl}/search`,
      criteria
    );
  }
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
  updateBien(id:number,
    bien: Bien,
    newImages: File[],
    deletedImages: number[]
  ): Observable<any> {


    const formData = new FormData();


    // Property JSON
    formData.append(
      'property',
      new Blob(
        [
          JSON.stringify(bien)
        ],
        {
          type: 'application/json'
        }
      )
    );


    // New images
    newImages.forEach(image => {

      formData.append(
        'images',
        image
      );

    });


    // Deleted image IDs
    formData.append(
      'deletedImages',
      JSON.stringify(deletedImages)
    );


    return this.http.put(
      `${this.apiUrl}/${id}/update`,
      formData
    );

  }

  deleteBien(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
