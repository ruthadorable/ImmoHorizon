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
    console.log("on search clicked");
    // Optional: Call your API
    this.loadProperties();
  }

  loadProperties() {
    console.log(this.criteria);
  }
  public getBiens()
  {

  } 
  
  
  } 
  