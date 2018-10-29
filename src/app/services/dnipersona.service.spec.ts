import { TestBed } from '@angular/core/testing';

import { DnipersonaService } from './dnipersona.service';

describe('DnipersonaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DnipersonaService = TestBed.get(DnipersonaService);
    expect(service).toBeTruthy();
  });
});
