import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatMenuModule,
    TranslateModule,
    FooterComponent,
    MatIconModule
   ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ImmoHorizon-frontend';
  public loginService = inject(LoginService);
  constructor(private translate: TranslateService,private dialog: MatDialog) {
    this.translate.addLangs(['en', 'fr', 'nl']);
    this.translate.use('en');
   }

  setLanguage(lang: string) {
    this.translate.use(lang)
  }
  public getBiens()
  {

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

