import { Component, Output, EventEmitter } from '@angular/core';
import { ProductoService } from '../../Services/producto-service';

@Component({
  selector: 'app-filtro-precio',
  imports: [],
  templateUrl: './filtro-precio.html',
  styleUrl: './filtro-precio.css',
})
export class FiltroPrecio {
  
  @Output() precioChange = new EventEmitter<string>();

  onSelectPrecio(event: any) {
    const precio = event.target.value as string;
    this.precioChange.emit(precio);
  }
  
}
