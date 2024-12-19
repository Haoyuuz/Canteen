import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateProductcatModalComponent } from './add-update-productcat-modal.component';

describe('AddUpdateProductcatModalComponent', () => {
  let component: AddUpdateProductcatModalComponent;
  let fixture: ComponentFixture<AddUpdateProductcatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUpdateProductcatModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateProductcatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
