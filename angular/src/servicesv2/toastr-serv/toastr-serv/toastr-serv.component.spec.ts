import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastrServComponent } from './toastr-serv.component';

describe('ToastrServComponent', () => {
  let component: ToastrServComponent;
  let fixture: ComponentFixture<ToastrServComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastrServComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastrServComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
