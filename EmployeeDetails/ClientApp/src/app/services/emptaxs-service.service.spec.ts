import { TestBed } from '@angular/core/testing';

import { EmptaxsServiceService } from './emptaxs-service.service';

describe('EmptaxsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmptaxsServiceService = TestBed.get(EmptaxsServiceService);
    expect(service).toBeTruthy();
  });
});
