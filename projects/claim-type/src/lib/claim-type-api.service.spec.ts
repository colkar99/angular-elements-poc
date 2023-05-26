import { TestBed } from '@angular/core/testing';

import { ClaimTypeApiService } from './claim-type-api.service';

describe('ClaimTypeApiService', () => {
  let service: ClaimTypeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimTypeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
