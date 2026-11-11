import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeVisiteComponent } from './demande-visite.component';

describe('DemandeVisiteComponent', () => {
  let component: DemandeVisiteComponent;
  let fixture: ComponentFixture<DemandeVisiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeVisiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeVisiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
