import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublierAnnonceComponent } from './publier-annonce.component';

describe('PublierAnnonceComponent', () => {
  let component: PublierAnnonceComponent;
  let fixture: ComponentFixture<PublierAnnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublierAnnonceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublierAnnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
