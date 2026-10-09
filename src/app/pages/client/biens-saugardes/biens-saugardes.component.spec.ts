import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiensSaugardesComponent } from './biens-saugardes.component';

describe('BiensSaugardesComponent', () => {
  let component: BiensSaugardesComponent;
  let fixture: ComponentFixture<BiensSaugardesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiensSaugardesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiensSaugardesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
