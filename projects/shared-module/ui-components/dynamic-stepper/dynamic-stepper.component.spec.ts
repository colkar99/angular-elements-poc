import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DynamicStepperComponent } from './dynamic-stepper.component';

describe('DynamicStepperComponent', () => {
  let component: DynamicStepperComponent;
  let fixture: ComponentFixture<DynamicStepperComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicStepperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
