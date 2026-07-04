import { Component ,Input} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SearchBarComponent } from '../../../shared/searchbar/searchbar.component';
import { CriteresRecherche } from '../../../models/criteresRecherche.model';
import { PropertiesListComponent } from '../../../shared/properties-list/properties-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-properties',
  imports: [MatToolbarModule,TranslateModule,MatCardModule,SearchBarComponent,PropertiesListComponent,MatButtonModule,MatIconModule],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.css'
})
export class PropertiesComponent {
  @Input()
  criteria!: CriteresRecherche;

  constructor(private translate: TranslateService) { }

  setLanguage(lang: string) {
    this.translate.use(lang)
  }

  onSearch(criteria: CriteresRecherche) {

    this.criteria = criteria;

    // Optional: Call your API
    this.loadProperties();
  }

  loadProperties() {
    console.log(this.criteria);
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
