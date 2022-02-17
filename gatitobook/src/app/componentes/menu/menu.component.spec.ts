import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';

describe(`${MenuComponent.name}`, () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`#${MenuComponent.name} should be created`, () => {
    expect(component).toBeTruthy();
  });

  it(`(D) should display the menu when 'mostraMenu' is true`, () => {
    component.mostraMenu = true;
    fixture.detectChanges();

    const menuEl: HTMLElement =
      fixture.nativeElement.querySelector('.active-menu');

    expect(menuEl).toBeTruthy();
  });

  it(`(D) should not display the menu when 'mostraMenu' is false`, () => {
    component.mostraMenu = false;
    fixture.detectChanges();

    const menuEl: HTMLElement =
      fixture.nativeElement.querySelector('.active-menu');
    expect(menuEl).toBeNull();
  });

  it(`(D) should close menu when is clicked or space is pressed`, () => {
    const nativeElement = fixture.nativeElement;
    component.mostraMenu = true;
    fixture.detectChanges();
    const divOverlayEl = nativeElement.querySelector('.overlay') as HTMLElement;
    divOverlayEl.dispatchEvent(new Event('click'));
    let mostraMenu = component.mostraMenu;
    expect(mostraMenu)
      .withContext('Closed clicking on [.overlay] div')
      .toBeFalse();

    component.mostraMenu = true;
    fixture.detectChanges();
    let closeIconEl = nativeElement.querySelector('i');
    closeIconEl.dispatchEvent(new Event('click'));
    expect(mostraMenu).withContext('Closed clicking on close icon').toBeFalse();

    component.mostraMenu = true;
    fixture.detectChanges();
    closeIconEl = nativeElement.querySelector('i');
    closeIconEl.dispatchEvent(new KeyboardEvent('keyup', { key: 'space' }));
    expect(mostraMenu).withContext('Pressing space on close icon').toBeFalse();
  });

  it(`#${MenuComponent.prototype.abreMenu.name} should toggle 'mostraMenu' when called`, () => {
    component.mostraMenu = true;
    component.abreMenu();
    expect(component.mostraMenu).toBeFalse();

    component.abreMenu();
    expect(component.mostraMenu).toBeTrue();
  });
});
