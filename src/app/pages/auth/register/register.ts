import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../../Services/usuario-service';
import { CreateClienteDTO, Cliente } from '../../../models/cliente';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';   

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  private formBuilder = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private router = inject(Router);
  
  public form = this.formBuilder.group({
    nombres: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    telefono: ['', [Validators.required, Validators.minLength(10)]],
  });
  
  
  OnSubmit(){
    if(this.form.valid){
      const cliente: CreateClienteDTO = {
        nombres: this.form.value.nombres!,
        apellidos: this.form.value.apellidos!,
        email: this.form.value.email!,
        password: this.form.value.password!,
        telefono: this.form.value.telefono!,
        direccion: {
          calle: '',
          codigoPostal: 0,
          estado: '',
        },

      }
      this.usuarioService.register(cliente).subscribe({
        next: (response) => {
          console.log('Registro exitoso', response);
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Error en el registro', error);
        }
      });
    }
  }
  

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
