import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';
import { Usuario } from 'src/app/autenticacao/usuario/usuario';

import { CabecalhoComponent } from './cabecalho.component';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

describe(`#${CabecalhoComponent.name}`, () => {
  let component: CabecalhoComponent;
  let fixture: ComponentFixture<CabecalhoComponent>;
  let usuarioService: UsuarioService;
  const userMock: Usuario = { id: 1, name: 'user', email: 'user@email.com' };
  let jwtDecodeSpy;

  beforeEach(async () => {
    localStorage.clear();
    await TestBed.configureTestingModule({
      declarations: [CabecalhoComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    jwtDecodeSpy = spyOn<any>(jwt, 'default');
    jwtDecodeSpy.and.returnValue(userMock);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CabecalhoComponent);
    component = fixture.componentInstance;

    usuarioService = TestBed.inject(UsuarioService);
    fixture.detectChanges();
  });
  afterAll(() => {
    localStorage.clear();
  });

  it(`#${CabecalhoComponent.name} should create a component`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${CabecalhoComponent.prototype.logout.name} should logout user when called`, () => {
    usuarioService.salvaToken('USERACCESSTOKEN');
    let currentUser!: Usuario;
    component.user$.subscribe((user) => {
      currentUser = user;
    });

    expect(currentUser.name).toBe(userMock.name);
    fixture.detectChanges();

    component.logout();
    component.user$.subscribe((user) => {
      currentUser = user;
    });

    expect(currentUser.name).toBeFalsy();
  });

  it(`(D) should be display login button when user is not logged in`, () => {
    component.logout();
    fixture.detectChanges();

    const loginEle: HTMLElement =
      fixture.nativeElement.querySelector('.navbar-text');

    expect(loginEle).toBeTruthy();
  });

  it(`(D) should display user name when user is logged in`, () => {
    usuarioService.salvaToken('USERACCESSTOKEN');
    fixture.detectChanges();

    const userNameEl: HTMLElement =
      fixture.nativeElement.querySelector('.user-name');
    const userNameText = userNameEl.textContent ?? '';

    expect(userNameText).toBe('user');
  });

  it(`(D) should logout when button is clicked`, () => {
    usuarioService.salvaToken('USERACCESSTOKEN');
    fixture.detectChanges();
    const logoutButtonEl: HTMLElement =
      fixture.nativeElement.querySelector('.logout');
    logoutButtonEl.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    const userNameEl: HTMLElement =
      fixture.nativeElement.querySelector('.user-name');

    expect(userNameEl).toBeNull();
  });
});
