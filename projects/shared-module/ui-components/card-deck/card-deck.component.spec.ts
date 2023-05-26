import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CardDeckComponent } from './card-deck.component';

describe('CardDeckComponent', () => {
  let component: CardDeckComponent;
  let fixture: ComponentFixture<CardDeckComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
