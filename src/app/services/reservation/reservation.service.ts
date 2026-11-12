import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReservationVisite } from '../../models/reservation-visite.model';
import { ReservationVisiteResponse } from '../../models/visit-response.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = `${environment.apiUrl}/api/reservation-visite`; 
  private http= inject(HttpClient); 

  constructor() { }


  creerReservation(
    reservation: ReservationVisite,
    documents: File[] = []
  ): Observable<ReservationVisiteResponse> {

    const formData = new FormData();

    // Informations de la réservation
    formData.append(
      'reservation',
      new Blob(
        [JSON.stringify(reservation)],
        { type: 'application/json' }
      )
    );

    // Documents facultatifs
    documents.forEach(document => {
      formData.append('documents', document);
    });

    return this.http.post<ReservationVisiteResponse>(
      `${this.apiUrl}/creer`,
      formData
    );
  }
}
