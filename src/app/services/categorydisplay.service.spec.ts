import { TestBed } from '@angular/core/testing';

import { CategorydisplayService } from './categorydisplay.service';

describe('CategorydisplayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategorydisplayService = TestBed.get(CategorydisplayService);
    expect(service).toBeTruthy();
  });
});
