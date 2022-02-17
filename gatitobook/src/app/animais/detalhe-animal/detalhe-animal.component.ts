import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css'],
})
export class DetalheAnimalComponent implements OnInit {
  animalId!: number;
  animal$!: Observable<Animal>;
  constructor(
    private animalService: AnimaisService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalId;
    this.animal$ = this.animalService.buscarPorId(this.animalId);
  }

  curtir() {
    this.animalService.curtirPhoto(this.animalId).subscribe((curtida) => {
      if (curtida) {
        this.animal$ = this.animalService.buscarPorId(this.animalId);
      }
    });
  }

  excluir() {
    this.animalService.excluiAnimal(this.animalId).subscribe(
      () => {
        this.router.navigate(['/animais']);
      },
      (error) => console.log(error)
    );
  }
}
