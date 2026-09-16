import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { HasRoleGuard } from './role.guard';

describe('HasRoleGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => HasRoleGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
