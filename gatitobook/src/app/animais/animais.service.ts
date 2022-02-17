import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Animais, Animal } from './animais';

const API = environment.API;
const NOT_MODIFIED = `304`;

@Injectable({
  providedIn: 'root',
})
export class AnimaisService {
  constructor(private httpService: HttpClient) {}

  listaDoUsuario(nomeDoUsuario: string): Observable<Animais> {
    return this.httpService.get<Animais>(`${API}/${nomeDoUsuario}/photos`);
  }

  buscarPorId(id: number): Observable<Animal> {
    return this.httpService.get<Animal>(`${API}/photos/${id}`);
  }

  excluiAnimal(id: number): Observable<Animal> {
    return this.httpService.delete<Animal>(`${API}/photos/${id}`);
  }

  curtirPhoto(id: number): Observable<boolean> {
    return this.httpService
      .post(`${API}/photos/${id}/like`, {}, { observe: 'response' })
      .pipe(
        mapTo(true),
        catchError((error) => {
          return error.status === 304 ? of(false) : throwError(error);
        })
      );
  }

  upload(
    descricao: string,
    permiteComentario: boolean,
    arquivo: File
  ): Observable<any> {
    const formData = new FormData();
    formData.append('description', descricao);
    formData.append('allowComments', permiteComentario ? 'true' : 'false');
    formData.append('imageFile', arquivo);

    return this.httpService.post(`${API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }
}
