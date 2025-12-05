import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Auth } from '../../../Services/auth';
import { AuthModel } from '../../../models/auth';
import { AuthStateService } from '../../../Services/auth-state';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  token = '';

  private formBuilder = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private authState = inject(AuthStateService);

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  public errorMessage: string = '';

  onSubmit() {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email!;
      const password = this.loginForm.value.password!;

      this.auth.login(email, password).subscribe({
        next: (res: AuthModel) => {
          console.log('Login exitoso', res);
          this.authState.login(res.token);  
          this.router.navigate(['/']); 
        },
        error: (err) => {
          console.error('Error al iniciar sesión', err);
          this.errorMessage = err.error?.message || 'Error en el login';
        }
      });
    } else {
      this.errorMessage = 'Por favor llena todos los campos correctamente.';
    }
  }

  
  

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
