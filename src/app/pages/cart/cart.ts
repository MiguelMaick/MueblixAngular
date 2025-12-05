import { Component, AfterViewInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Productos } from '../../models/productos';

interface PaypalDetails {
  payer: {
    name: { given_name: string; surname: string };
    email_address: string;
  };
  id: string;
  status: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
  styleUrls: ['./cart.css']
})
export class Cart implements AfterViewInit {

  cart: Productos[] = [];

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef) {
    const saved = sessionStorage.getItem('cart');
    if (saved) this.cart = JSON.parse(saved);
  }

  // Añadir producto al carrito
  addToCart(product: Productos): void {
    const index = this.cart.findIndex(p => p._id === product._id);
    if (index === -1) {
      this.cart.push({ ...product, cantidad: 1 });
    } else {
      this.cart[index].cantidad += 1;
    }
    this.saveCart();
  }

  // Quitar producto del carrito
  removeFromCart(id: string): void {
    this.cart = this.cart.filter(p => p._id !== id);
    this.saveCart();
  }

  // Guardar carrito en sessionStorage
  private saveCart(): void {
    sessionStorage.setItem('cart', JSON.stringify(this.cart));
  }

  // Total del carrito
  get total(): string {
    return this.cart
      .reduce((sum, p) => sum + Number(p.precio) * p.cantidad, 0)
      .toFixed(2);
  }

  // Cargar PayPal SDK
  ngAfterViewInit(): void {
    this.loadPaypalScript();
  }

  private loadPaypalScript(): void {
    const scriptId = 'paypal-sdk';
    if (document.getElementById(scriptId)) {
      this.renderPaypalButton();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    // ⚠️ Usa aquí tu Client ID de sandbox
    script.src = 'https://www.paypal.com/sdk/js?client-id=ATTzunNtIQExdoSpq67m9GSvr6fqh4EYmjjPRvjNn4aUjAE-vn-K4hcuKgGZxLbtnhL0zjp-E50RxB2v&currency=MXN';
    script.onload = () => this.renderPaypalButton();
    document.body.appendChild(script);
  }

  private renderPaypalButton(): void {
    const container = document.getElementById('paypal-button-container');
    if (!container) return;

    if (this.cart.length === 0) {
      container.classList.add('hidden');
      return;
    } else {
      container.classList.remove('hidden');
    }

    const paypalInstance = (window as any).paypal;
    if (!paypalInstance) {
      console.error('PayPal SDK no está disponible.');
      return;
    }

    paypalInstance.Buttons({
      style: { color: 'gold', shape: 'pill', label: 'pay' },

      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{ amount: { value: this.total } }]
        });
      },

      onApprove: async (data: any, actions: any) => {
        try {
          const details: PaypalDetails = await actions.order.capture();

          const token = localStorage.getItem('token');
          if (!token) {
            alert('Debes iniciar sesión para realizar el pago.');
            return;
          }

          // Payload para backend
          const payload = {
            producto: this.cart.map(p => p._id),  
            cantidad: this.cart.reduce((sum, p) => sum + p.cantidad, 0),
            total: Number(this.total),
            estado: 'pendiente',
            pago: {
              metodo_pago: 'PayPal',
              estatus_pago: 'completado',
              fecha_pago: new Date()
            }
          };

          console.log('Token JWT:', token);
          console.log('Payload a enviar:', payload);

          // Enviar pedido al backend
          const response = await fetch('http://localhost:3000/pedido', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error backend:', errorData);
            throw new Error(errorData.message || 'Error al registrar el pedido');
          }

          this.ngZone.run(() => {
            alert(`Pago exitoso 🎉 Gracias por tu compra, ${details.payer.name.given_name}!`);
            this.cart = [];
            sessionStorage.removeItem('cart');
            this.cd.detectChanges(); // ⚡️ fuerza actualización
          });

        } catch (err) {
          console.error('Error al procesar el pago:', err);
          alert('Error al procesar el pago ❌');
        }
      },

      onError: (err: any) => {
        console.error('Error PayPal:', err);
        alert('Error en el pago ❌');
      }
    }).render('#paypal-button-container');
  }
}
