import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [MatCardModule,TranslateModule,MatButtonModule, MatMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private translate: TranslateService) { }

  setLanguage(lang: string) {
    this.translate.use(lang)
  }
  
  featuredProperties=[{id: 1, title: 'Property 1', description: 'Description 1', imageUrl: './images/property1/E1639047601343846456_8058AXL.jpg'}, {id: 2, title: 'Property 2', description: 'Description 2', imageUrl: 'image2.jpg'}, {id: 3, title: 'Property 3', description: 'Description 3', imageUrl: 'image3.jpg'}];  
   
}
