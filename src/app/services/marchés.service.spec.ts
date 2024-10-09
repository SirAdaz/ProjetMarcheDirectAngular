import { TestBed } from '@angular/core/testing';

import { MarchésService } from './marchés.service';

describe('MarchésService', () => {
  let service: MarchésService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarchésService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
