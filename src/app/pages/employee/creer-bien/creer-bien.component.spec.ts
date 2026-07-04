import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerBienComponent } from './creer-bien.component';

describe('CreerBienComponent', () => {
  let component: CreerBienComponent;
  let fixture: ComponentFixture<CreerBienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerBienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerBienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
