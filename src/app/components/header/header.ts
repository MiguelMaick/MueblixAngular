// src/app/components/header/header.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router'; 

// Asegúrate de que la ruta sea correcta según tu estructura
import { CartMenu } from '../cart-menu/cart-menu'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    // RouterLink y RouterLinkActive ya vienen en RouterModule, pero dejarlos no afecta
    RouterLink, 
    RouterLinkActive,
    CartMenu
  ], 
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  
  // 1. ESTADO DEL CARRITO
  isCartOpen: boolean = false; 

  // 2. NUEVO: ESTADO DEL MENÚ MÓVIL (Necesario para el nuevo diseño)
  isMobileMenuOpen: boolean = false;

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Lógica del Carrito (Mantenemos tu lógica de bloquear el scroll)
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
    
    // Si abrimos el carrito, cerramos el menú móvil por si acaso
    if (this.isCartOpen) {
      this.isMobileMenuOpen = false; 
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // 3. NUEVAS FUNCIONES PARA EL MENÚ MÓVIL
  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Opcional: Bloquear scroll también al abrir menú móvil
    if (this.isMobileMenuOpen) {
        // Cerramos el carrito si se abre el menú
        this.isCartOpen = false;
    }
  }
  
  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }
}