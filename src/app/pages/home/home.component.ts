import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../dialog/login-dialog/login-dialog.component';
import { HomepageBanner } from '../../models/banner.model';
import { HomepageService } from '../../services/homepage/homepage.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [ MatCardModule, TranslateModule, MatButtonModule, MatMenuModule,MatIconModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  banner!: HomepageBanner; 
  homePageService = inject(HomepageService);

  constructor(private translate: TranslateService) { }

  setLanguage(lang: string) {
    this.translate.use(lang)
  }
  

ngOnInit(): void {

    this.homePageService
        .getActiveBanner()
        .subscribe(banner => {

            this.banner = banner;

        });

}
   
}
