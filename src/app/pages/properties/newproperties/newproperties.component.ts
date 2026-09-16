import { Component, inject } from '@angular/core';
import { Bien } from '../../../models/bien.model';
import { BienService } from '../../../services/biens/bien.service';
import { PropertyCardComponent } from '../../../shared/card/property-card/property-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-newproperties',
  imports: [MatIconModule,
    MatButtonModule,MatToolbarModule,PropertyCardComponent,TranslateModule],
  templateUrl: './newproperties.component.html',
  styleUrl: './newproperties.component.css'
})
export class NewpropertiesComponent {
    private service= inject(BienService);
  properties: Bien[]=[];

  ngOnInit(){
    this.service.getNewProperties().subscribe( {
        next: (data:any) =>{
          this.properties=data;
          console.log(data);
          console.log("Resultats de la recherche", this.properties)
        },
        error: (err)=>{
          console.error('Error loading properties',err);
        }
      });
  }
}
