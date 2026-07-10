import { Component ,inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoginService } from '../../services/auth/login/login.service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login-request';
import { RegisterService } from '../../services/auth/register/register.service';
import { error } from 'node:console';

@Component({
  selector: 'app-login-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {

  mode: 'login' | 'register' = 'login';
  hidePassword = true;
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<LoginDialogComponent>)
  private loginService= inject(LoginService)
  private registerService=inject(RegisterService)
  private router= inject(Router)

    form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  form2 = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    noGsm: ['', Validators.required]
  });
   

  invalidCredentials = false;
  switchMode() {
    this.mode = this.mode === 'login' ? 'register' : 'login';
  }

  close() {
    this.dialogRef.close();
  }

 submit() {
  if (!this.form.valid) {
    console.log('Form invalid');
    return;
  }

    const request = {
      email: this.form.get('email')?.value || undefined,
      password: this.form.get('password')?.value || undefined
    };

    if (!request.email || !request.password) {
      console.log('Missing email or password');
      return;
    }

    this.loginService.onLogin(request).subscribe({
      next: (response: any) => {
        console.log('Received Response:', response);

        const token =
          response?.token ||
          response?.access_token ||
          response?.accessToken ||
          '';

        if (!token) {
          console.error('No token returned from backend');
          return;
        }

        localStorage.setItem('token', token);
        console.log(response);
        this.loginService.setRoles(response.user?.role);
        this.loginService.setToken(response.jwtToken);
        localStorage.setItem("auth_token",response.jwtToken);
        const role= response.user?.role;
        console.log("role",role);
        localStorage.setItem('username',response.user?.nom);
        localStorage.setItem('prenom',response.user?.prenom)
        console.log(localStorage.getItem('username'));
        if(role=="ADMIN"){
          localStorage.setItem('role',"Admin")
          console.log("should navigate to dashboard");
          this.router.navigate(['/admin']);
        }
        if(role=="EMPLOYE"){
          localStorage.setItem('role',"Employe")
          console.log("should navigate to dashboard");
          this.router.navigate(['/employee/dashboard']);
        }
        if(role=="CLIENT"){
          localStorage.setItem('role',"User")
          alert("Vous êtes connecté en tant qu'utilisateur. Vous serez redirigé vers la page d'accueil.");
          this.router.navigate(['/home']);
  
        }
        this.dialogRef.close(this.form.value);
      },

      error: (err) => {
        console.error('LOGIN ERROR:', err);
      }
    });
}
  submitRegister() {

    const registerRequest = {
      email: this.form2.get('email')?.value || undefined ,
      password: this.form2.get('password')?.value || undefined,
      nom: this.form2.get('nom')?.value || undefined,
      prenom: this.form2.get('prenom')?.value || undefined,
      noGsm: this.form2.get('noGsm')?.value || undefined,
      role: 'CLIENT',
      id_role: 2
    };

    this.registerService.register(registerRequest).subscribe({
      next: (res) => {
        console.log('REGISTER SUCCESS', res);
      },
      error: (err) => {
        console.error('REGISTER ERROR', err);
      }
    });
    console.log(this.mode, this.form2.value);
    this.dialogRef.close(this.form2.value);
  }

  

  
}

  