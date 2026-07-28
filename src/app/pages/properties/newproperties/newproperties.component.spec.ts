import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewpropertiesComponent } from './newproperties.component';

describe('NewpropertiesComponent', () => {
  let component: NewpropertiesComponent;
  let fixture: ComponentFixture<NewpropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewpropertiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewpropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
