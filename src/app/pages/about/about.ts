import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
})
export class About implements AfterViewInit {

  // 1. Seleccionamos todos los elementos marcados con #animateItem
  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Verificamos que estemos en el navegador (no en el servidor)
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Eliminamos las clases que ocultan y desplazan el elemento
            entry.target.classList.remove(
              'opacity-0', 
              'translate-y-8', 
              'translate-y-12', 
              'translate-x-12', 
              '-translate-x-12', 
              'scale-95'
            );
            
            // Añadimos las clases para mostrarlo en su posición final
            entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0', 'scale-100');
            
            // Dejamos de observar para que la animación se ejecute solo una vez
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15 // Se activa cuando el 15% del elemento es visible
      });

      this.animateItems.forEach(item => {
        observer.observe(item.nativeElement);
      });
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}