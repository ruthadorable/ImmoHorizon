import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PropertyCardComponent } from '../../../shared/card/property-card/property-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { Bien } from '../../../models/bien.model';
import { BienService } from '../../../services/biens/bien.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-avendre',
  imports: [MatIconModule,
    RouterLink,
    MatButtonModule,MatToolbarModule,PropertyCardComponent,TranslateModule
  ],
  templateUrl: './avendre.component.html',
  styleUrl: './avendre.component.css'
})
export class AvendreComponent {
    private service= inject(BienService);
  properties!: Bien[];

  ngOnInit(){
    this.service.getBiensAvendre().subscribe(
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
  

}
