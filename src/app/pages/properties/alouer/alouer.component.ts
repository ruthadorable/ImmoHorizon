import { Component,inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PropertyCardComponent } from '../../../shared/card/property-card/property-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { BienService } from '../../../services/biens/bien.service';
import { Bien } from '../../../models/bien.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-alouer',
  imports: [MatIconModule,
    MatButtonModule,MatToolbarModule,PropertyCardComponent,TranslateModule],
  templateUrl: './alouer.component.html',
  styleUrl: './alouer.component.css'
})
export class AlouerComponent {

  private service= inject(BienService);
  properties!: Bien[];

  ngOnInit(){
    this.service.getBiensAlouer().subscribe(
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

