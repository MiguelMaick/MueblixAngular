// src/app/components/header/header.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router'; 

import { CartMenu } from '../cart-menu/cart-menu'; 

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule, 
    RouterLink, 
    RouterLinkActive,
    CartMenu
  ], 
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  
  // 1. DEFINIMOS LA PROPIEDAD DE ESTADO
  isCartOpen: boolean = false; 


  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 2. DEFINIMOS LA FUNCIÓN toggleCart() QUE FALTABA
  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
    // Controlar el scroll del body
    if (this.isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }
}