import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { NovoUsuarioService } from './novo-usuario.service';

describe('NovoUsuarioService', () => {
  let service: NovoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(NovoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
