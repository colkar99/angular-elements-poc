import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimTypeBuilderComponent } from './claim-type-builder.component';

describe('ClaimTypeBuilderComponent', () => {
  let component: ClaimTypeBuilderComponent;
  let fixture: ComponentFixture<ClaimTypeBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClaimTypeBuilderComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimTypeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
