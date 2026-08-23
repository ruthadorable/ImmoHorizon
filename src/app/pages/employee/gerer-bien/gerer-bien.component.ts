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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmDialogComponent } from '../../../shared/delete-confirm-dialog/delete-confirm-dialog.component';
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
    MatIconModule,MatTooltipModule,TopToolbarComponent,TranslateModule,DatePipe,MatPaginatorModule,
    MatDialogModule
  ],
  templateUrl: './gerer-bien.component.html',
  styleUrl: './gerer-bien.component.css'
})
export class GererBienComponent {
  @ViewChild(MatPaginator)
   paginator!: MatPaginator;

   bienService=inject(BienService);
   route=inject(Router)
   properties!:Bien[];
   dataSource:any;
   dialog= inject(MatDialog);
  ngOnInit(){
    this.loadProperties();

  }

  loadProperties(){
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

   getImageUrl(url?: string): string {
     if (!url) {
    return './images/properties/penthouse1.jpg';
  }
  return url;
  }

  getType(type:string){
    if(type=='A louer'){
      return 'FORRENT'
    }
    else
      return 'FORSALE'

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

  deleteDialog(id: number) {
      this.dialog.open(DeleteConfirmDialogComponent, {
        data: {
          title:'Confimer la suppression ',
          message: 'Etes-vous sûre de vouloir supprimer le bien '+id+'?'
        },
        width: '600px',
        disableClose: true
      });
    }

 deleteProperty(id: number): void {

  const dialogRef = this.dialog.open(DeleteConfirmDialogComponent, {
    width: '400px',
    disableClose: true,
    data: {
      title: 'Delete Property',
      message: 'Are you sure you want to permanently delete this property?'
    }
  });

  dialogRef.afterClosed().subscribe(result => {

    if (result) {

      this.bienService.deleteBien(id).subscribe({

        next: () => {

          this.loadProperties();

        },

        error: err => console.error(err)

      });

    }

  });

}
}
