import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comentarios } from './comentario';
import { ComentariosService } from './comentarios.service';

const fakeComment = {
  date: new Date(),
  text: 'new comment',
  userName: 'usertest',
};
describe(`${ComentariosService.name}`, () => {
  let service: ComentariosService;
  let API = environment.API;
  let httpTestClient: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ComentariosService);
    httpTestClient = TestBed.inject(HttpTestingController);
  });

  it(`#${ComentariosService.name} should be created`, () => {
    expect(service).toBeTruthy();
  });

  it(`#${ComentariosService.prototype.buscaComentario.name} should send a request to API to get comments when called`, (done: DoneFn) => {
    const id = 1;
    service.buscaComentario(id).subscribe((comments: Comentarios) => {
      expect(comments[0]).toEqual(fakeComment);

      done();
    });

    httpTestClient
      .expectOne({ method: 'GET', url: `${API}/photos/${id}/comments` })
      .flush([fakeComment, fakeComment]);
  });

  it(`#${ComentariosService.prototype.incluiComentario.name} should send request with comment to API when called`, (done) => {
    const id = 1;
    service.incluiComentario(id, fakeComment.text).subscribe(() => {
      done();
    });

    const req = httpTestClient.expectOne({
      method: 'POST',
      url: `${API}/photos/${id}/comments`,
    });

    req.flush(fakeComment);

    const commentText = req.request.body.commentText;

    expect(commentText).toBe(fakeComment.text);
  });
});
