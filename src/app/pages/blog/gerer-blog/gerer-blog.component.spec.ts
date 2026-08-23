import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererBlogComponent } from './gerer-blog.component';

describe('GererBlogComponent', () => {
  let component: GererBlogComponent;
  let fixture: ComponentFixture<GererBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GererBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GererBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
