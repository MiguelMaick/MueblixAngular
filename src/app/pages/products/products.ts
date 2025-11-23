import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements AfterViewInit {

  // 1. Seleccionamos todos los elementos marcados con #animateItem
  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    // Verificamos que estamos en el navegador
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Eliminamos las clases que ocultan el elemento
            entry.target.classList.remove(
              'opacity-0', 
              'translate-y-4', 
              'translate-y-8', 
              'translate-y-12'
            );
            
            // Añadimos las clases para mostrarlo
            entry.target.classList.add('opacity-100', 'translate-y-0');
            
            // Dejamos de observar
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
      });

      this.animateItems.forEach(item => {
        observer.observe(item.nativeElement);
      });
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
}