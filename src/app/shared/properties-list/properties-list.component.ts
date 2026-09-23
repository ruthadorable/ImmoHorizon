import { Component,Input, SimpleChanges } from '@angular/core';
import { CriteresRecherche } from '../../models/criteresRecherche.model';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/biens/bien.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { PropertyCardComponent } from '../card/property-card/property-card.component';

@Component({
  selector: 'app-properties-list',
  imports: [TranslateModule,MatCardModule,MatButtonModule,PropertyCardComponent],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.css'
})
export class PropertiesListComponent {
  @Input()
  criteria!: CriteresRecherche;

  @Input()
  showAll = false;

  properties: Bien[] = [];

  constructor(
    private propertyService: BienService,
    private translate: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['showAll']) {
      if (this.showAll) {
        this.loadAllProperties();
      } else {
        this.loadProperties();
      }
    }

    if (changes['criteria'] && this.criteria && !this.showAll) {
      this.loadProperties();
    }
  }

  loadAllProperties(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (data: Bien[]) => {
        this.properties = data;
        console.log('All properties:', this.properties);
      },
      error: (err) => {
        console.error('Error loading all properties:', err);
      }
    });
  }

  loadProperties(): void {
    this.propertyService.searchProperties(this.criteria).subscribe({
      next: (data: Bien[]) => {
        this.properties = data;
        console.log('Search results:', this.properties);
      },
      error: (err) => {
        console.error('Error loading properties:', err);
      }
    });
  }
}
