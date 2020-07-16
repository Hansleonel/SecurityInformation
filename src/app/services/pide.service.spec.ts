import { TestBed } from '@angular/core/testing';

import { PideService } from './pide.service';

describe('PideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PideService = TestBed.get(PideService);
    expect(service).toBeTruthy();
  });
});
