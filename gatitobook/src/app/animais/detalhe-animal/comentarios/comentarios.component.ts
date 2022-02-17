import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Comentarios } from './comentario';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css'],
})
export class ComentariosComponent implements OnInit {
  @Input() animalId!: number;
  comentarios$!: Observable<Comentarios>;

  comentarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private comentariosService: ComentariosService
  ) {}

  ngOnInit(): void {
    this.comentarios$ = this.comentariosService.buscaComentario(this.animalId);
    this.comentarioForm = this.formBuilder.group({
      comentario: ['', [Validators.maxLength(300)]],
    });
  }

  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? '';

    this.comentarios$ = this.comentariosService
      .incluiComentario(this.animalId, comentario)
      .pipe(
        switchMap(() => this.comentariosService.buscaComentario(this.animalId)),
        tap(() => {
          this.comentarioForm.reset();
          alert('Comentario gravado');
        })
      );
  }
}
