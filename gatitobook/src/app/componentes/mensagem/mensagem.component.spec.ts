import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensagemComponent } from './mensagem.component';

describe(`${MensagemComponent.name}`, () => {
  let component: MensagemComponent;
  let fixture: ComponentFixture<MensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MensagemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${MensagemComponent.name} should be created`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) should display message when recieve (@Input mesagem)`, () => {
    const messageMock = 'Testing message component';
    component.mensagem = messageMock;

    fixture.detectChanges();

    const spanMessageEl: HTMLElement =
      fixture.nativeElement.querySelector('small');
    const messageValue = spanMessageEl.textContent;

    expect(messageValue).toBe(messageMock);
  });
});
