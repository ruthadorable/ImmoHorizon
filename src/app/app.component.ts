import { Component,PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './shared/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import {MatMenuModule } from '@angular/material/menu';
import { LoginService } from './services/auth/login/login.service';
import { MatIconModule } from '@angular/material/icon';
import { LanguageSelectorComponent } from './shared/language-selector/language-selector.component';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

export class HomeComponent {}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    RouterLink,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    FooterComponent,
    MatIconModule,
    LanguageSelectorComponent,RouterLink,MatToolbarModule
   ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImmoHorizon-frontend';
  public loginService = inject(LoginService);
  private platformId = inject(PLATFORM_ID);
  public role:any;
  constructor(private translate: TranslateService,private dialog: MatDialog,private router:Router) {
    this.translate.addLangs(['en', 'fr', 'nl']);
    this.translate.use('en');
    
   }
   ngOnInit(){
     if (isPlatformBrowser(this.platformId)) {
      this.role = localStorage.getItem('role');
    }
   }

  setLanguage(lang: string) {
    this.translate.use(lang)
  }
  public getBiens()
  {

  }
  navToSauvegarde()
  {
    this.router.navigate(['/sauvegardes'])
  }
  navToProfile()
  {
    this.router.navigate(['/profile']);
  } 
  navToEmployeeDashboard(){
    this.router.navigate(['/employee/dashboard']);
  }
  navToAdminDashboard(){
    this.router.navigate(['/admin']);
  }
  public getRole(){
    const role=this.loginService.role.toString();
    return role || ''
  }

  public getUsername(): string {
    const username = localStorage.getItem('prenom');
    return username ? username : '';
  }
  openLogin() {
    this.dialog.open(LoginDialogComponent, {
      width: '600px',
      disableClose: true
    });
  }
  logout(){
    this.loginService.logout();
  }

}

