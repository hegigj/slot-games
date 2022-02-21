import { TestBed } from '@angular/core/testing';

import { JackpotsService } from './jackpots.service';

describe('JackpotsService', () => {
  let service: JackpotsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JackpotsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
