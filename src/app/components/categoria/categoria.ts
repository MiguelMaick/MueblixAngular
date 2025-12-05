import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../Services/producto-service';
import { CategoriaModel } from '../../models/categoria';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria.html',
  styleUrls: ['./categoria.css'],
})
export class Categoria implements OnInit {

  @Output() categoriaSeleccionada = new EventEmitter<string>(); // Emite la categoría al padre
  CategoriaModel: CategoriaModel[] = [];

  constructor(private productoService: ProductoService) { }

  ngOnInit() {
    this.productoService.getCategorias().subscribe(res => {
      this.CategoriaModel = res;
    });
  }

  filtrar(event: Event) {
    const id = (event.target as HTMLSelectElement).value;
    this.categoriaSeleccionada.emit(id); // Envía el id al componente Products
  }
}

