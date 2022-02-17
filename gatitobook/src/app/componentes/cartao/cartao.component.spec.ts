import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaoComponent } from './cartao.component';

describe(`${CartaoComponent.name}`, () => {
  let component: CartaoComponent;
  let fixture: ComponentFixture<CartaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartaoComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${CartaoComponent.name} should be created`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display title when recieve (@Input title)`, () => {
    const titleText = 'Some title';
    component.titulo = titleText;
    fixture.detectChanges();

    const titleEl: HTMLElement =
      fixture.nativeElement.querySelector('.card-header');
    const titleElText = titleEl.textContent;

    expect(titleElText).toEqual(titleText);
  });
});
