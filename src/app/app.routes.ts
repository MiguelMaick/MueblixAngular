// src/app/app.routes.ts

import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Products } from './pages/products/products';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Privacy } from './pages/privacy/privacy';
import { Questions } from './pages/questions/questions';
import { Terms } from './pages/terms/terms';
import { AuthModule } from './pages/auth/auth-module';

export const routes: Routes = [
  { path: 'home', component: Home },
  { path: 'products', component: Products },
  { path: 'about', component: About},
  { path: 'contact', component: Contact },
  { path: 'privacy', component: Privacy },
  { path: 'questions', component: Questions },
  { path: 'terms', component: Terms },
  { path: 'auth', loadChildren: () => import('./pages/auth/auth-module').then(m => m.AuthModule) },

];