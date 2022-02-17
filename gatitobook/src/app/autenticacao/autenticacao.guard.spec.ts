import { TestBed } from '@angular/core/testing';
import { RouteConfigLoadStart } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AutenticacaoGuard } from './autenticacao.guard';

describe('AutenticacaoGuard', () => {
  let guard: AutenticacaoGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
    guard = TestBed.inject(AutenticacaoGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
