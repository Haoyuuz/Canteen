import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMaintenanceDashboardComponent } from './admin-maintenance-dashboard.component';

describe('AdminMaintenanceDashboardComponent', () => {
  let component: AdminMaintenanceDashboardComponent;
  let fixture: ComponentFixture<AdminMaintenanceDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminMaintenanceDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminMaintenanceDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
