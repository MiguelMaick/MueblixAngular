// cart-menu.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-menu.html',
  styleUrl: './cart-menu.css',
})
export class CartMenu {
  // Input para recibir el estado de apertura desde el Header
  @Input() isOpen: boolean = false; 
  
  // utput para notificar al Header que se debe cerrar
  @Output() closeCart = new EventEmitter<void>();

  // Función para cerrar el carrito (útil si hay un botón de cerrar dentro del menú)
  onClose(): void {
    this.closeCart.emit();
  }
}
