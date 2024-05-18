import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'votacion_electronica';

  constructor() {
    // Bloquear navegación hacia atrás y adelante al cargar la aplicación
    history.pushState(null, '', window.location.href);
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: Event) {
    // Bloquear navegación hacia atrás y adelante cuando se detecta un evento de cambio en el historial
    history.pushState(null, '', window.location.href);
  }
}
