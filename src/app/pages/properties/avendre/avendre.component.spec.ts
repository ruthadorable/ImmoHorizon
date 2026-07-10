import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvendreComponent } from './avendre.component';

describe('AvendreComponent', () => {
  let component: AvendreComponent;
  let fixture: ComponentFixture<AvendreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvendreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvendreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
