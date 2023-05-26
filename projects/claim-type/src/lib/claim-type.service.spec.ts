import { TestBed } from '@angular/core/testing';

import { ClaimTypeService } from './claim-type.service';

describe('ClaimTypeService', () => {
  let service: ClaimTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
