import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Auth } from '../../Services/auth';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {

  private auth = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  user: Cliente | null = null;
  loading = true;
  errorMessage = '';

  profileForm = this.fb.group({
    nombres: ['', Validators.required],
    apellidos: ['', Validators.required],
    email: [{ value: '', disabled: true }],
    telefono: ['']
  });

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/auth/login']);
      return;
    }

    // 🔹 Suscribirse al BehaviorSubject del Auth
    this.auth.user$.pipe(take(1)).subscribe({
      next: (usuario) => {
        if (usuario) {
          this.user = usuario;
          this.profileForm.patchValue({
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            email: usuario.email,
            telefono: usuario.telefono || ''
          });
        }
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = 'Error al cargar el perfil';
        this.loading = false;
      }
    });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
