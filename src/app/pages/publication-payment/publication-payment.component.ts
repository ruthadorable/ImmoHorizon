import { Component, Input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PaymentService } from '../../services/payment/payment.service';

@Component({
  selector: 'app-publication-payment',
  standalone: true,
    imports: [
    CurrencyPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './publication-payment.component.html',
  styleUrl: './publication-payment.component.css'
})
export class PublicationPaymentComponent {

  @Input() property: any;

  publicationFee = 150;

  isProcessing = false;
  paymentError = '';

  constructor(
    private paymentService: PaymentService
  ) {}

  payPublicationFee(): void {

    this.isProcessing = true;
    this.paymentError = '';

    const request = {
      propertyId: this.property?.id,
      paymentType: 'FRAIS_PUBLICATION'
    };

    this.paymentService
      .createPublicationPayment(request)
      .subscribe({

        next: (response: any) => {

          if (response.checkoutUrl) {

            window.location.href = response.checkoutUrl;

          } else {

            this.paymentError =
              'Unable to create the Stripe payment session.';

            this.isProcessing = false;
          }

        },

        error: (error: any) => {

          console.error(
            'Stripe payment error:',
            error
          );

          this.paymentError =
            'Unable to start the payment. Please try again.';

          this.isProcessing = false;
        }

      });
  }
}