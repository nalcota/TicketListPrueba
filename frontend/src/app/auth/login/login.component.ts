import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

submit() {
  if (this.loginForm.invalid) return;

  const { username, password } = this.loginForm.value;

  // Aquí es donde pones la llamada al servicio de login
  this.authService.login({ username, password }).subscribe({
    next: () => this.router.navigate(['/tickets']), // redirige si login correcto
    error: () => (this.error = 'Usuario o contraseña incorrecta') // muestra error
  });
}
}
