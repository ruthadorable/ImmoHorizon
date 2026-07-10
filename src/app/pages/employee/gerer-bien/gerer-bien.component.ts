import { AfterViewInit, Component,inject, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCalendar } from '@angular/material/datepicker';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { SidenavComponent } from '../shared/sidenav/sidenav.component';
import { TopToolbarComponent } from '../shared/top-toolbar/top-toolbar.component';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BienService } from '../../../services/biens/bien.service';
import { Bien } from '../../../models/bien.model';
import {CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorIntl } from '@angular/material/paginator';

export function frenchPaginator() {
  const paginator = new MatPaginatorIntl();

  paginator.itemsPerPageLabel = 'Éléments par page';
  paginator.nextPageLabel = 'Suivant';
  paginator.previousPageLabel = 'Précédent';
  paginator.firstPageLabel = 'Première page';
  paginator.lastPageLabel = 'Dernière page';

  return paginator;
}
@Component({
  selector: 'app-gerer-bien',
  imports: [CommonModule,MatCardModule,MatButtonModule,MatToolbarModule,
    MatSidenavModule, MatListModule,MatButtonModule,MatTableModule,MatIcon,
    MatIconModule,MatTooltipModule,TopToolbarComponent,TranslateModule,DatePipe,MatPaginatorModule
  ],
  templateUrl: './gerer-bien.component.html',
  styleUrl: './gerer-bien.component.css'
})
export class GererBienComponent {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  bienService=inject(BienService)
  route=inject(Router)
  properties!:Bien[];
  dataSource:any;
  ngOnInit(){
    this.bienService.getAllProperties().subscribe((data)=>{
      this.properties=data;
       this.dataSource = new MatTableDataSource(this.properties);
       if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    }
    )

  }
 

  
  
 
  
  displayedColumns = [
    'image',
    'title',
    'price',
    'type',
    'status',
    'actions'
  ];

   getImageUrl(imageKey?: string): string {
     if (!imageKey) {
    return './images/properties/penthouse1.jpg';
  }
  return `https://immohorizon-images.s3.us-east-1.amazonaws.com/${imageKey}`;
  }
  createProperty() {
    this.route.navigate(['employee/dashboard/creer-bien']);
  }

  viewProperty(id: number) {
    this.route.navigate(['employee/dashboard/property/'+id])
  }

  editProperty(id: number) {
     this.route.navigate(['employee/dashboard/modifier-bien/'+id]);
  }

  deleteProperty(id: number) {}
  
}
