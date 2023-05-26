import { TestBed } from '@angular/core/testing';

import { ClaimTypeStateService } from './claim-type-state.service';

describe('ClaimTypeStateService', () => {
  let service: ClaimTypeStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimTypeStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
