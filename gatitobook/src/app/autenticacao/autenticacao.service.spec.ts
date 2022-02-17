import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AutenticacaoService } from './autenticacao.service';
import { HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario/usuario.service';

const API = 'http://localhost:3000/user/login';

describe(`${AutenticacaoService.name}`, () => {
  let service: AutenticacaoService;
  let httpController: HttpTestingController;
  let usuarioService: UsuarioService;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    }).compileComponents();
    service = TestBed.inject(AutenticacaoService);
    httpController = TestBed.inject(HttpTestingController);
    usuarioService = TestBed.inject(UsuarioService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it(`#${AutenticacaoService.name} should create service`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${AutenticacaoService.prototype.autenticar.name} should have make a request expecting a token when is called`, async (done) => {
    const salvaTokenSpy = spyOn(usuarioService, 'salvaToken');
    const user = 'username';
    const pass = 'password';
    const headers = new HttpHeaders().set('x-access-token', user + pass);
    service.autenticar(user, pass).subscribe(() => {
      expect(salvaTokenSpy).toHaveBeenCalled();
      done();
    });
    httpController.expectOne(API).flush('OK', { headers });
  });
});
