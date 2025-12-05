// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Privacy } from './pages/privacy/privacy';
import { Questions } from './pages/questions/questions';
import { Terms } from './pages/terms/terms';
import { Categoria } from './components/categoria/categoria';
import { NotFound } from './pages/not-found/not-found';
import { AuthModule } from './pages/auth/auth-module';
import { authGuard } from './guards/auth-guard';
import { Cart } from './pages/cart/cart';
import { ProfileComponent } from './pages/profile/profile';
import { Pedidos } from './pages/pedidos/pedidos';


export const routes: Routes = [
  { path: '', component: Home, title: 'Home' },
  { path: 'products', component: Products, title: 'Products' },
  { path: 'about', component: About, title: 'About' },
  { path: 'contact', component: Contact, title: 'Contact' },
  { path: 'privacy', component: Privacy, title: 'Privacy' },
  { path: 'questions', component: Questions, title: 'Questions' },
  { path: 'terms', component: Terms, title: 'Terms' },
  { path: 'pedidos', canActivate: [authGuard], component: Pedidos, title: 'Pedidos' },
  { path: 'profile', canActivate: [authGuard], component: ProfileComponent, title: 'Profile' },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth-module').then(m => m.AuthModule) },

  {
    path: 'categoria/:id',
    component: Categoria,
    title: 'Categoria',
  },
  { path: 'cart',  canActivate: [authGuard], component: Cart, title: 'Cart' },
  { path: '**', component: NotFound, title: 'Not Found' },
];