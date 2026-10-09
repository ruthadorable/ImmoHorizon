import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesCandidaturesComponent } from './mes-candidatures.component';

describe('MesCandidaturesComponent', () => {
  let component: MesCandidaturesComponent;
  let fixture: ComponentFixture<MesCandidaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesCandidaturesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesCandidaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
