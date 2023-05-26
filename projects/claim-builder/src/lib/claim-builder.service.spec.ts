import { TestBed } from '@angular/core/testing';

import { ClaimBuilderService } from './claim-builder.service';

describe('ClaimBuilderService', () => {
  let service: ClaimBuilderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClaimBuilderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
