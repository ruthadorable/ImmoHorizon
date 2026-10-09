import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MesVisitesComponent } from './mes-visites.component';

describe('MesVisitesComponent', () => {
  let component: MesVisitesComponent;
  let fixture: ComponentFixture<MesVisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MesVisitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MesVisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
