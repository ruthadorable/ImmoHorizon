import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

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
  loginForm = this.formBuilder.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  });
  invalidCredentials = false;
  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;   
  }
  register() {
    this.router.navigate(['/register']);
  }
  
}
