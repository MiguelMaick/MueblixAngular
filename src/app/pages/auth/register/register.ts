
// register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-register',
  standalone: true, 
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  // ... lógica
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}