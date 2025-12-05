import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../Services/pedido-service';
import { HttpClientModule } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Pedido } from '../../models/pedido';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Pedidos implements OnInit {

  pedidos: Pedido[] = [];
  loading = true;

  constructor(
    private pedidoService: PedidoService,
    private cd: ChangeDetectorRef // 🔥 Necesario para OnPush
  ) {}

  ngOnInit(): void {
    console.log('🔵 PedidosComponent inicializado');
    this.obtenerPedidos();
  }

  obtenerPedidos(): void {
    console.log('⏳ Solicitando pedidos al servidor...');

    this.loading = true;

    this.pedidoService.getPedidos()
      .pipe(take(1))
      .subscribe({
        next: (res: Pedido[]) => {
          console.log('🟢 Respuesta recibida del backend:', res);
          console.log('📦 Total pedidos recibidos:', res?.length ?? 0);

          // 🔥 Render inmediato compatible con OnPush
          this.pedidos = res ?? [];
          this.loading = false;

          this.cd.markForCheck(); // 🔥 Forzar actualización del HTML con OnPush
        },
        error: (err) => {
          this.loading = false;
          console.error('🔴 Error al cargar pedidos:', err);
          this.cd.markForCheck();
        }
      });
  }

  trackByPedido(index: number, item: Pedido) {
    return item._id;
  }
}
