import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder,FormControl, ReactiveFormsModule } from '@angular/forms';
import { BienService } from '../../../services/biens/bien.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { map, Observable, startWith } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { belgianCities } from '../../../enum/belgianCities.model';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { typesDeBien } from '../../../enum/typeBiens.enum';
import { etats } from '../../../enum/etats.enum';
import { pebs } from '../../../enum/pebs.enum';
import { TypeChauffage } from '../../../enum/typeDeChauffage.enum';
import {MatNativeDateModule} from '@angular/material/core';

@Component({
  selector: 'app-creer-bien',
  imports: [TranslateModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    DragDropModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatAutocompleteModule,AsyncPipe,
  MatSelectModule,MatCheckboxModule,
  MatDatepickerModule,
MatNativeDateModule],
  templateUrl: './creer-bien.component.html',
  styleUrl: './creer-bien.component.css'
})
export class CreerBienComponent implements OnInit{

  private fb = inject(FormBuilder);
  readonly pebs = Object.values(pebs);
  readonly typeChauffage= Object.values(TypeChauffage);
  belgianCities=belgianCities;
  readonly etats=Object.values(etats);
  selectedFiles: File[] = [];
  readonly typesDeBien = Object.values(typesDeBien);
  filteredCities!:Observable<any[]>;
  cityControl = new FormControl('');

  constructor(private bienService: BienService) { }

  form = this.fb.group({
  title: [''],
  type: [''],
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
  type_chauffage:[null],
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

  ngOnInit() {
    this.filteredCities = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCities(value || ''))
    );
  }

  private filterCities(value: string) {
    const search = value.toLowerCase();
    return this.belgianCities.filter(city =>
      city.commune.toLowerCase().startsWith(search)
    );
  }
selectedCity(city: any) {
  this.form.patchValue({
    commune: city.commune,
    code_postal: city.postalCode
  });
}

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
  console.log(this.form.value);
  console.log(this.selectedFiles);
  console.log(this.selectedFiles.length);
  

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
           console.log(err.status);
            console.log(err.error);
            console.log(err.message);
        }
      });
}

}
