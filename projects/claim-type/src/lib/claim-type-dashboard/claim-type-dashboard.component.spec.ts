import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTypeDashboardComponent } from './claim-type-dashboard.component';

describe('ClaimTypeDashboardComponent', () => {
  let component: ClaimTypeDashboardComponent;
  let fixture: ComponentFixture<ClaimTypeDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimTypeDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTypeDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
