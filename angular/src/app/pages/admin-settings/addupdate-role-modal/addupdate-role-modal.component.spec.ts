import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateRoleModalComponent } from './addupdate-role-modal.component';

describe('AddupdateRoleModalComponent', () => {
  let component: AddupdateRoleModalComponent;
  let fixture: ComponentFixture<AddupdateRoleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddupdateRoleModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddupdateRoleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
