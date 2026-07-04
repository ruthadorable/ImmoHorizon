import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from '../../shared/footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../../dialog/login-dialog/login-dialog.component';

@Component({
  selector: 'app-home',
  imports: [ MatCardModule, TranslateModule, MatButtonModule, MatMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private translate: TranslateService) { }

  setLanguage(lang: string) {
    this.translate.use(lang)
  }
  public getBiens()
  {

  } 
  
  featuredProperties=[{
    id: 1,
    title: 'Maison',
    description: "Cette maison polyvalente avec espace commercial, grand garage intérieur et espace de stockage étonnamment grand se trouve dans un endroit extrêmement pratique à Meire, à distance de marche du centre de Zottegem, des supermarchés et des écoles.",
    imageUrl: './images/properties/E1639047601343846456_8058AXL.jpg'}, 
    {id: 2,
    title: 'Penthouse avec une belle vue sur la plage de Costa del Sol', 
    description: 'Penthouse comprenant 2 chambres avec une terrasse orienté sud', 
    imageUrl: './images/properties/penthouse1.jpg'}, 
    {id: 3, 
    title: 'Appartement ', 
    description: 'Magnifique appartement en bord de mer.',
    imageUrl: './images/properties/src_BZPAAP11693_315262_V0_CEFF.jpg'}];  
   
}
