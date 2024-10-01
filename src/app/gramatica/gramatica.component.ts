import { Component } from '@angular/core';

@Component({
  selector: 'app-gramatica',
  standalone: true,
  imports: [],
  templateUrl: './gramatica-component.html',
  styleUrl: './gramatica-component.css'
})
export class GramaticaComponent {

  testButton() {
    window.alert('Pegando!');
  }

}
