import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlouerComponent } from './alouer.component';

describe('AlouerComponent', () => {
  let component: AlouerComponent;
  let fixture: ComponentFixture<AlouerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlouerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlouerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
