import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ListaAnimaisResolver } from './lista-animais.resolver';

describe('ListaAnimaisResolver', () => {
  let resolver: ListaAnimaisResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    resolver = TestBed.inject(ListaAnimaisResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
