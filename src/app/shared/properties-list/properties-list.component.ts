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
  properties?: Bien[] = [];

  constructor(private propertyService: BienService, private translate: TranslateService
  ) {}


  ngOnInit(): void {
    this.propertyService.searchProperties(this.criteria).subscribe(
      {
        next: (data:any) =>{
          this.properties=data;
          console.log(data);
          console.log("Resultats de la recherche", this.properties)
        },
        error: (err)=>{
          console.error('Error loading properties',err);
        }
      }
    )
  }

  ngOnChanges(changes: SimpleChanges) {

  if (changes['criteria'] && this.criteria) {
    this.loadProperties();
  }

}

loadProperties() {
  console.log(this.criteria);

  this.propertyService.searchProperties(this.criteria)
    .subscribe({
        next: (data:any) =>{
          this.properties=data;
          console.log(data);
          console.log("On change:", this.properties)
        },
        error: (err)=>{
          console.error('Error loading properties',err);
        }
      });
}


}
