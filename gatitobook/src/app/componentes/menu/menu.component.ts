import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  mostraMenu!: boolean;

  constructor() {}

  abreMenu() {
    this.mostraMenu = !this.mostraMenu;
  }
}
