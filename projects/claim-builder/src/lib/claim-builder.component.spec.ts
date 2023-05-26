import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimBuilderComponent } from './claim-builder.component';

describe('ClaimBuilderComponent', () => {
  let component: ClaimBuilderComponent;
  let fixture: ComponentFixture<ClaimBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaimBuilderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
