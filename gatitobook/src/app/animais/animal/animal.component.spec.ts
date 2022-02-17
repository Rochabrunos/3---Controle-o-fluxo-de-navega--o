import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimalComponent } from './animal.component';

describe(`${AnimalComponent.name}`, () => {
  let component: AnimalComponent;
  let fixture: ComponentFixture<AnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimalComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${AnimalComponent.name} should be created`, () => {
    expect(component).toBeTruthy();
  });

  it(`shoud not modify url when url starts with 'data'`, () => {
    const url = 'datatest';
    component.url = url;

    expect(component.url).toBe(url);
  });

  it(`shoud modify url when url don't start with 'data'`, () => {
    const url = 'testdata';
    component.url = url;

    expect(component.url).toBe(`http://localhost:3000/imgs/${url}`);
  });

  it(`should bind image attributes [src] and [alt] when recieve (@Input url) and (@Input descricao)`, (done) => {
    const url = 'datatest';
    const description = 'Some image';
    component.url = url;
    component.descricao = description;

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const imgEl: HTMLElement = fixture.nativeElement.querySelector('img');
      const imgSrcAttr = imgEl.getAttribute('src');
      expect(imgSrcAttr).withContext('src').toBe(url);

      const imgAltAttr = imgEl.getAttribute('alt');
      expect(imgAltAttr).withContext('alt').toBe(description);

      done();
    });
  });
});
