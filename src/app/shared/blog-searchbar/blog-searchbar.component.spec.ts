import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSearchbarComponent } from './blog-searchbar.component';

describe('BlogSearchbarComponent', () => {
  let component: BlogSearchbarComponent;
  let fixture: ComponentFixture<BlogSearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogSearchbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
