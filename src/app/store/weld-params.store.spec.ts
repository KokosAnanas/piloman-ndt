import { TestBed } from '@angular/core/testing';

import { WeldParamsStore } from './weld-params.store';

describe('WeldParamsStore', () => {
  let service: WeldParamsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeldParamsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
