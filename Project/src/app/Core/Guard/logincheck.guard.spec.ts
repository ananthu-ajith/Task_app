import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logincheckGuard } from './logincheck.guard';

describe('logincheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logincheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
