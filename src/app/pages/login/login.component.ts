import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private loginService = inject(LoginService);

  loginForm = this.formBuilder.nonNullable.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  });
  invalidCredentials = false;
  login() {
    
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;   
    const request = { email, password };
    if (email && password) {
      this.loginService.onLogin(request).subscribe({
        next: (response) => {
          console.log('Received Response:'+JSON.stringify(response.token));
          // Handle successful login (e.g., store token, redirect)
          localStorage.setItem('token', response.token || '');
          this.router.navigate(['/home']);
        },
        error: () => {
          this.invalidCredentials = true;
          console.log('Invalid credentials');
        }
      });
    }
  }
  register() {
    this.router.navigate(['/register']);
  }
  
}
