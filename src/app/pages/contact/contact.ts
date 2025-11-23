import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact implements AfterViewInit {

  // 1. Seleccionamos todos los elementos que marcamos con #animateItem en el HTML
  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  // 2. Inyectamos PLATFORM_ID para asegurarnos de que el código corra en el navegador
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // 3. Cuando el elemento es visible, quitamos las clases que lo ocultan/mueven
            entry.target.classList.remove(
              'opacity-0', 
              'translate-y-8', 
              'translate-y-4', 
              'translate-y-12', 
              'translate-x-[-20px]', 
              'scale-95'
            );
            
            // 4. Y añadimos las clases que lo muestran en su posición final
            entry.target.classList.add('opacity-100', 'translate-x-0', 'translate-y-0', 'scale-100');
            
            // Dejamos de observar para que la animación solo ocurra una vez
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento entra en pantalla
      });

      this.animateItems.forEach(item => {
        observer.observe(item.nativeElement);
      });
    }
  }
  
  // 5. Método auxiliar para el scroll suave
  scrollToTop() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}