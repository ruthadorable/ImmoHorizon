import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreerBlogComponent } from './creer-blog.component';

describe('CreerBlogComponent', () => {
  let component: CreerBlogComponent;
  let fixture: ComponentFixture<CreerBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreerBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreerBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
