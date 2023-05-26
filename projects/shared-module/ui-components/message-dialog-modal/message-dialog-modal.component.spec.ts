import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDialogModalComponent } from './message-dialog-modal.component';

describe('MessageDialogModalComponent', () => {
  let component: MessageDialogModalComponent;
  let fixture: ComponentFixture<MessageDialogModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessageDialogModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
