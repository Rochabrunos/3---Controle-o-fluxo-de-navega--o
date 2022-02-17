import { TestBed } from '@angular/core/testing';

import { TokenService } from './token.service';

describe(`${TokenService.name}`, () => {
  let service: TokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenService);

    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it(`#${TokenService.name} should create service`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${TokenService.prototype.possuiToken.name} should return true when local storage have a token when is called`, () => {
    localStorage.setItem('token', 'I have token here');
    const hasToken = service.possuiToken();

    expect(hasToken).toBeTrue();
  });

  it(`#${TokenService.prototype.possuiToken.name} should return false when local storage haven't a token when is called`, () => {
    const hasToken = service.possuiToken();

    expect(hasToken).toBeFalse();
  });
  it(`#${TokenService.prototype.salvaToken.name} should save token in local storage when is called`, () => {
    const accessToken = 'USERACCESSTOKEN';
    service.salvaToken(accessToken);
    const token = localStorage.getItem('token');

    expect(token).toBe(accessToken);
  });
  it(`#${TokenService.prototype.retornaToken.name} should return token saved in local storage when is called`, () => {
    const accessToken = 'USERACCESSTOKEN';
    localStorage.setItem('token', accessToken);
    const token = service.retornaToken();

    expect(token).toBe(accessToken);
  });
  it(`#${TokenService.prototype.excluiToken.name}`, () => {
    const accessToken = 'USERACCESSTOKEN';
    localStorage.setItem('token', accessToken);
    service.excluiToken();
    const token = localStorage.getItem('token');

    expect(token).toBe(null);
  });
});
