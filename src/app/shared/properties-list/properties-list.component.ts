import { Component,Input } from '@angular/core';
import { CriteresRecherche } from '../../models/criteresRecherche.model';
import { Bien } from '../../models/bien.model';
import { BienService } from '../../services/biens/bien.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-properties-list',
  imports: [TranslateModule,MatCardModule,MatButtonModule],
  templateUrl: './properties-list.component.html',
  styleUrl: './properties-list.component.css'
})
export class PropertiesListComponent {
  @Input()
  criteria!: CriteresRecherche;
  properties?: Bien[] = [];

  constructor(private propertyService: BienService, private translate: TranslateService
  ) {}

  getImageUrl(imageKey?: string): string {
     if (!imageKey) {
    return './images/properties/penthouse1.jpg';
  }
  return `https://immohorizon-images.s3.us-east-1.amazonaws.com/${imageKey}`;
}

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe({
      next: (data:any) => {
        this.properties = data;
        console.log('Properties loaded:', this.properties);
      },
      error: (err) => {
        console.error('Error loading properties', err);
      }
    });
  }


}
