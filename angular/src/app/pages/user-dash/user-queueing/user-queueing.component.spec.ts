import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserQueueingComponent } from './user-queueing.component';

describe('UserQueueingComponent', () => {
  let component: UserQueueingComponent;
  let fixture: ComponentFixture<UserQueueingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserQueueingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserQueueingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
