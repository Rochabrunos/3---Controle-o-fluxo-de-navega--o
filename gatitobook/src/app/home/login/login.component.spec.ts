import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

import { LoginComponent } from './login.component';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

describe(`${LoginComponent.name}`, () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let form!: NgForm;
  let authService = {
    autenticar: jasmine.createSpy('autenticar'),
  };
  let router = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [HttpClientTestingModule, FormsModule],
      providers: [
        {
          provide: Router,
          useValue: router,
        },
        {
          provide: AutenticacaoService,
          useValue: authService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenRenderingDone().then(() => {
      form = component.form;
    });
    router.navigate.and.callFake(() => {});
  });

  it(`#${LoginComponent.name} should create a component`, () => {
    expect(component).toBeTruthy();
  });

  it(`#${LoginComponent.prototype.login.name} should redirect user to ["animais"] route when called with correct user"`, async () => {
    authService.autenticar.and.callFake(() => {
      return of(true);
    });

    component.usuario = 'user';
    component.senha = 'pass';

    await component.login();

    expect(router.navigate).toHaveBeenCalledWith(['animais']);
  });

  it(`#${LoginComponent.prototype.login.name} should display an alert when errors occurs`, async () => {
    spyOn(window, 'alert');

    authService.autenticar.and.callFake(() => {
      return throwError('');
    });

    await component.login();

    expect(window.alert).toHaveBeenCalledWith('Usuário ou senha inválido');
  });

  it(`(D) should display validation error message when input 'usuario' is invalid`, async (done) => {
    const userControl: AbstractControl = form.form.get(
      'usuario'
    ) as AbstractControl;
    userControl.markAsTouched();
    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      const erroMessageEl: HTMLElement = fixture.nativeElement.querySelector(
        'app-mensagem[mensagem="Usuário obrigatório"]'
      );

      expect(erroMessageEl).toBeTruthy();
      done();
    });
  });

  it(`(D) should display validation error message when input 'password' is invalid`, async (done) => {
    const passwordControl: AbstractControl = form.form.get(
      'senha'
    ) as AbstractControl;
    passwordControl.markAsTouched();

    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      const erroMessageEl: HTMLElement = fixture.nativeElement.querySelector(
        'app-mensagem[mensagem="Senha obrigatória"]'
      );

      expect(erroMessageEl).toBeTruthy();
      done();
    });
  });

  it(`(D) should disable submit button when form is invalid`, async (done) => {
    const passwordControl: AbstractControl = form.form.get(
      'senha'
    ) as AbstractControl;

    passwordControl.setValue('');
    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      const button: HTMLElement = fixture.nativeElement.querySelector('button');
      const disable = button.hasAttribute('disabled');

      expect(disable).toBeTrue();
      done();
    });
  });

  it(`(D) should disable submit button when form is invalid`, async (done) => {
    const userControl: AbstractControl = form.form.get(
      'usuario'
    ) as AbstractControl;
    const passwordControl: AbstractControl = form.form.get(
      'senha'
    ) as AbstractControl;

    userControl.setValue('username');
    passwordControl.setValue('password');
    fixture.detectChanges();
    fixture.whenRenderingDone().then(() => {
      const button: HTMLElement = fixture.nativeElement.querySelector('button');
      const disable = button.hasAttribute('disabled');

      expect(disable).toBeFalse();
      done();
    });
  });
});
