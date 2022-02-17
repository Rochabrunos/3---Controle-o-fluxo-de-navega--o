import {
  HttpEvent,
  HttpEventType,
  HttpProgressEvent,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { skipWhile } from 'rxjs/operators';

import { AnimaisService } from './animais.service';

const API = 'http://localhost:3000';
const userMock = {
  id: 1,
  name: 'username',
  email: 'username@email.com',
};

const httpService = {
  post: jasmine.createSpy('post'),
};

describe(`${AnimaisService.name}`, () => {
  let service: AnimaisService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(AnimaisService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it(`#${AnimaisService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${AnimaisService.prototype.listaDoUsuario.name} should request to the server a list with all photos of user when called`, async (done) => {
    let wasCalled: boolean = false;

    service.listaDoUsuario(userMock.name).subscribe(() => {
      wasCalled = true;
      expect(wasCalled).toBeTrue();
      done();
    });

    httpController
      .expectOne({ method: 'GET', url: `${API}/${userMock.name}/photos` })
      .flush(of(true));
  });

  it(`#${AnimaisService.prototype.buscarPorId.name} should resquest to the server the photo with 'id' passed as argument when called`, async (done) => {
    let wasCalled: boolean = false;

    service.buscarPorId(1).subscribe(() => {
      wasCalled = true;
      expect(wasCalled).toBeTrue();
      done();
    });

    httpController
      .expectOne({ method: 'GET', url: `${API}/photos/1` })
      .flush(of(true));
  });
  it(`#${AnimaisService.prototype.excluiAnimal.name} should resquest that an animal with 'id' passed asargument be deleted when called`, async (done) => {
    let wasCalled: boolean = false;

    service.excluiAnimal(1).subscribe(() => {
      wasCalled = true;
      expect(wasCalled).toBeTrue();
      done();
    });

    httpController
      .expectOne({ method: 'DELETE', url: `${API}/photos/1` })
      .flush(of(true));
  });

  it(`#${AnimaisService.prototype.curtirPhoto.name} should resquest to the server to like the photo with 'id' passed as argument when called`, async (done) => {
    service.curtirPhoto(1).subscribe((res) => {
      expect(res).toBeTrue();
      done();
    });

    httpController
      .expectOne({ method: 'POST', url: `${API}/photos/1/like` })
      .flush('', { status: 200, statusText: 'OK ' });
  });

  it(`#${AnimaisService.prototype.curtirPhoto.name} should be false when status of response was NOT_MODIFIED`, async (done) => {
    service.curtirPhoto(1).subscribe((res) => {
      expect(res).toBeFalse();
      done();
    });
    httpController
      .expectOne({ method: 'POST', url: `${API}/photos/1/like` })
      .flush('', { status: 304, statusText: 'NOT_MODIFIED' });
  });

  it(`#${AnimaisService.prototype.curtirPhoto.name} should thorw error when status of response was an error except NOT_MODIFIED`, async (done) => {
    service.curtirPhoto(1).subscribe(
      (res) => {},
      (error) => {
        expect(error).toBeTruthy();
        done();
      }
    );
    httpController
      .expectOne({ method: 'POST', url: `${API}/photos/1/like` })
      .flush('', { status: 400, statusText: 'BAD_REQUEST' });
  });

  it(`${AnimaisService.prototype.upload.name} should upload a photo when called`, () => {
    const description = 'some description';
    const allowComments = true;
    const file = new File(['sfasdfsdf'], 'filename', { type: 'png' });

    service.upload(description, allowComments, file).subscribe();

    const data: FormData = httpController.expectOne({
      method: 'POST',
      url: `${API}/photos/upload`,
    }).request.body;

    expect(data.get('description')).toBe(description);
    expect(data.get('imageFile')).toEqual(file);
  });

  it(`#${AnimaisService.prototype.upload.name} should observe upload progress`, (done) => {
    const description = 'some description';
    const allowComments = false;
    const file = new File(['sfasdfsdf'], 'filename', { type: 'png' });
    service
      .upload(description, allowComments, file)
      .pipe(
        // Discard the first response
        skipWhile(({ loaded }) => {
          return !loaded;
        })
      )
      .subscribe(({ loaded, total }) => {
        const percentage = Math.round(100 * (loaded / total));

        // Define what we expect after receiving the progress response
        expect(percentage).toEqual(70);
        done();
      });

    httpController
      .expectOne({
        method: 'POST',
        url: `${API}/photos/upload`,
      })
      .event({
        type: HttpEventType.UploadProgress,
        loaded: 7,
        total: 10,
      });
  });
});
