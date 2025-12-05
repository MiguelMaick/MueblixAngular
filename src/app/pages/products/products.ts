import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, OnInit, ChangeDetectorRef, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductoService } from '../../Services/producto-service';
import { ModalProducto } from '../../components/modal-producto/modal-producto';
import { Productos } from '../../models/productos';
import { Categoria } from "../../components/categoria/categoria";
import { FiltroPrecio } from '../../components/filtro-precio/filtro-precio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, Categoria, FiltroPrecio, ModalProducto],
  templateUrl: './products.html',
  styleUrls: ['./products.css'],
})
export class Products implements AfterViewInit, OnInit {

  mensajeCarrito: string = '';
  mostrarToast: boolean = false;
  productos: Productos[] = [];
  productoSeleccionado: Productos | null = null;
  abrirModa = false;

  @ViewChildren('animateItem') animateItems!: QueryList<ElementRef>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  ngAfterViewInit() {
    this.animateItems.changes.subscribe(() => {
      setTimeout(() => this.observeItems(), 50);
    });
  }

  abrirVistaRapida(producto: Productos) {
    this.productoSeleccionado = producto;
    this.abrirModa = true;
  }

  cerrarVistaRapida() {
    this.productoSeleccionado = null;
    this.abrirModa = false;
  }

  private observeItems() {
    if (!isPlatformBrowser(this.platformId) || !this.animateItems || this.animateItems.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-12');
          entry.target.classList.add('opacity-100', 'translate-y-0');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.animateItems.forEach(item => observer.observe(item.nativeElement));
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  private cargarProductos() {
    this.productoService.getProductos(10, 0).subscribe(productos => {
      this.productos = productos;
      this.cdr.detectChanges();
    });
  }

  filtrarPorCategoria(id: string) {
    if (!id) {
      this.cargarProductos();
      return;
    }
    this.productoService.getByCategoria(id).subscribe(productos => {
      this.productos = productos;
      this.cdr.detectChanges();
    });
  }

  filtrarPorPrecio(precio: string) {
    if (!precio) {
      this.cargarProductos();
      return;
    }

    if (precio === 'asc') {
      this.productoService.getProductosMenorPrecio().subscribe(p => {
        this.productos = p;
        this.cdr.detectChanges();
      });
      return;
    }

    if (precio === 'desc') {
      this.productoService.getProductosMayorPrecio().subscribe(p => {
        this.productos = p;
        this.cdr.detectChanges();
      });
    }
  }

  agregarAlCarrito(producto: Productos) {
    // Usamos sessionStorage para sincronizar con el componente Cart
    const carrito: Productos[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const index = carrito.findIndex(p => p._id === producto._id);

    if (index === -1) {
      carrito.push({ ...producto, cantidad: 1 });
    } else {
      carrito[index].cantidad += 1;
    }

    sessionStorage.setItem('cart', JSON.stringify(carrito));

    // --- TOAST DE CONFIRMACIÓN ---
    this.mensajeCarrito = `${producto.nombre} agregado al carrito`;
    this.mostrarToast = true;

    setTimeout(() => {
      this.mostrarToast = false;
    }, 2500);
  }

}
