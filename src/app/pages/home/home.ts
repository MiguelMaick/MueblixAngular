import { Component, ViewChildren, QueryList, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements AfterViewInit {

  // Seleccionamos todos los elementos marcados con #animateItem
  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Verificar si estamos en el navegador para usar IntersectionObserver
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Cuando el elemento entra en pantalla, removemos las clases que lo ocultan
            entry.target.classList.remove('opacity-0', 'translate-y-12', '-translate-x-12', 'translate-x-12', 'translate-y-8', 'scale-95');
            // Y nos aseguramos de que tenga opacidad completa y posición original
            entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0', 'scale-100');
            
            // Dejamos de observar para que la animación solo ocurra una vez (opcional)
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15 // El elemento se activa cuando el 15% es visible
      });
      this.animateItems.forEach((item: ElementRef) => {
        observer.observe(item.nativeElement);
      });
    }
  }
  
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}