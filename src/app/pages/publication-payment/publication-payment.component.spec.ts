import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationPaymentComponent } from './publication-payment.component';

describe('PublicationPaymentComponent', () => {
  let component: PublicationPaymentComponent;
  let fixture: ComponentFixture<PublicationPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicationPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
