import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestsellerCarouselComponent } from './bestseller-carousel.component';

describe('BestsellerCarouselComponent', () => {
  let component: BestsellerCarouselComponent;
  let fixture: ComponentFixture<BestsellerCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BestsellerCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BestsellerCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
