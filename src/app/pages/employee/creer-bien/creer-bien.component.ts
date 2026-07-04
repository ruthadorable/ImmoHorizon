import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { BienService } from '../../../services/biens/bien.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
@Component({
  selector: 'app-creer-bien',
  imports: [TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    DragDropModule,
    MatInputModule,
    MatCardModule,
  MatSelectModule,MatCheckboxModule,MatDatepickerModule],
  templateUrl: './creer-bien.component.html',
  styleUrl: './creer-bien.component.css'
})
export class CreerBienComponent {

  private fb = inject(FormBuilder);
  public etats= ["DISPONIBLE",
    "VENDU",
    "LOUE",
    "SOUS_OPTION",
    "EN_MAINTENANCE",
    "EN_FIN_DE_LOCATION",
    "ARCHIVE"];
  selectedFiles: File[] = [];
  constructor(private bienService: BienService,private translate: TranslateService) { }

  form = this.fb.group({
  title: [''],
  typeDeBien: [''],
  description: [''],
  prix: [0],
  superficie: [0],
  chambres: [0],
  peb: [''],
  energieTotale: [0],
  energieSpecifique: [0],
  emissionCO2: [0],
  rue: [''],
  numero: [0],
  code_postal: [0],
  commune: [''],
  facades: [0],
  annee_construction: [null],
  disponibilite: [null],
  etat: [''],
  etages: [0],
  parking: [false],
  garage: [false],
  jardin: [false],
  terrasse: [false],
  cave: [false],
  disponible: [true],
  surfaceHabitable: [0],
  surfaceJardinTerrasse: [0],
  images: [null]
});

onFilesSelected(event: Event) {

  const input =
      event.target as HTMLInputElement;

  if (!input.files) {
    return;
  }

  this.selectedFiles =
      Array.from(input.files);
}

onFileChange(event: any) {
  this.selectedFiles = Array.from(event.target.files);
}
images: any[] = [];

onFileSelected(event: any) {
  const files = event.target.files;

  for (let file of files) {
    this.addImage(file);
  }
}
setPrimary(index: number) {
  this.images.forEach((img, i) => {
    img.isPrimary = i === index;
  });
}

removeImage(index: number) {
  this.images.splice(index, 1);
}

onDrop(event: any) {
  const files = event.item.data?.files || event.item.element.nativeElement.files;
}
addImage(file: File) {
  const reader = new FileReader();

  reader.onload = () => {
    this.images.push({
      file: file,
      url: reader.result,
      isPrimary: this.images.length === 0 // first image = primary
    });
  };

  reader.readAsDataURL(file);
}


  submit() {
   const property = {
    title: this.form.value.title,
    description: this.form.value.description,
    prix: this.form.value.prix,
    commune: this.form.value.commune
  };
  

  this.bienService
      .creerBien(
          property,
          this.selectedFiles
      )
      .subscribe({
        next: res => {
          console.log(res);
        },
        error: err => {
          console.error(err);
        }
      });
}

}
