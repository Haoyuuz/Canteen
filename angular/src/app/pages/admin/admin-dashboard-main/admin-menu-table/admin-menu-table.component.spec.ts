import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMenuTableComponent } from './admin-menu-table.component';

describe('AdminMenuTableComponent', () => {
  let component: AdminMenuTableComponent;
  let fixture: ComponentFixture<AdminMenuTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMenuTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMenuTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
