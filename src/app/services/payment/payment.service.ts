import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface PaymentRequest {
  propertyId: number;
  paymentType: string;
}

export interface PaymentResponse {
  checkoutUrl: string;
  sessionId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl =
   `${environment.apiUrl}`+'/api/biens';

  constructor(
    private http: HttpClient
  ) {}

  createPublicationPayment(
    request: PaymentRequest
  ): Observable<PaymentResponse> {

    return this.http.post<PaymentResponse>(
      `${this.apiUrl}/publish`,
      request
    );
  }
}