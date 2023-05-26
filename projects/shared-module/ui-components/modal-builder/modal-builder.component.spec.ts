import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalBuilderComponent } from './modal-builder.component';

describe('ModalBuilderComponent', () => {
  let component: ModalBuilderComponent;
  let fixture: ComponentFixture<ModalBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
