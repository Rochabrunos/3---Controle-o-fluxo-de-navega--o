import { TestBed } from '@angular/core/testing';

import * as jwt from 'jwt-decode';

import { Usuario } from './usuario';
import { UsuarioService } from './usuario.service';

describe(`${UsuarioService.name}`, () => {
  let service: UsuarioService;
  const userMock: Usuario = { id: 1, name: 'user', email: 'user@email.com' };
  let jwtDecodeSpy;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'ACCESSTOKEN');
    TestBed.configureTestingModule({});
    jwtDecodeSpy = spyOn<any>(jwt, 'default');
    jwtDecodeSpy.and.returnValue(userMock);

    service = TestBed.inject(UsuarioService);
  });

  afterAll(() => {
    localStorage.clear();
  });

  it(`#${UsuarioService.name} should create service`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${UsuarioService.prototype['decodificaJWT'].name} should return a user when is called`, async (done) => {
    service.salvaToken('ACCESSTOKEN');
    await service.retornaUsuario().subscribe((user) => {
      expect(user.id).withContext('User id').toEqual(userMock.id);
      expect(user.name).withContext('User name').toEqual(userMock.name);
      expect(user.email).withContext('User eamil').toEqual(userMock.email);
      done();
    });
  });
});
