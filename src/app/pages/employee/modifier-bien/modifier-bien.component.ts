import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BienService } from '../../../services/biens/bien.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { Bien } from '../../../models/bien.model';
import { Image } from '../../../models/image.model';
import { TopToolbarComponent } from '../shared/top-toolbar/top-toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatChipsModule} from '@angular/material/chips';

export interface NewImage {
  file: File;
  preview: string;
}
@Component({
  selector: 'app-modifier-bien',
  imports: [ReactiveFormsModule, MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatDividerModule, MatFormFieldModule, MatSelectModule,
    MatSidenavModule,
    MatTooltipModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
    MatChipsModule,
  TranslateModule],
  templateUrl: './modifier-bien.component.html',
  styleUrl: './modifier-bien.component.css'
})
export class ModifierBienComponent {

  private fb = inject(FormBuilder);
  deletedImages: number[] = [];
  public etats = ["DISPONIBLE",
    "VENDU",
    "LOUE",
    "SOUS_OPTION",
    "EN_MAINTENANCE",
    "EN_FIN_DE_LOCATION",
    "ARCHIVE"];
  public pebs=['A','B','C','D','E','F','G','X'];
  selectedFiles: File[] = [];
  public property!: Bien;
  public selectedImage?: Image;
  public adresse!: string;
  private bienService =inject(BienService);
  private route = inject(ActivatedRoute);
  private propertyId!: number;
  private translateService = inject(TranslateService);
propertyForm = this.fb.group({
  title: this.fb.control<string | null>(null),
  description: this.fb.control<string | null>(null),
  type: this.fb.control<string | null>(null),
  typeDeBien: this.fb.control<string | null>(null),
  prix: this.fb.control<number | null>(null),
  superficie: this.fb.control<number | null>(null),
  chambres: this.fb.control<number | null>(null),
  salleDeBain: this.fb.control<number | null>(null),
  peb: this.fb.control<string | null>(null),

  energieTotale: this.fb.control<number | null>(null),
  energieSpecifique: this.fb.control<number | null>(null),
  emissionCO2: this.fb.control<number | null>(null),

  rue: this.fb.control<string | null>(null),
  numero: this.fb.control<number | null>(null),
  code_postal: this.fb.control<number | null>(null),
  commune: this.fb.control<string | null>(null),

  facades: this.fb.control<number | null>(null),
  annee_construction: this.fb.control<number | null>(null),

  disponibilite: this.fb.control<Date | null>(null),

  etat: this.fb.control<string | null>(null),
  etages: this.fb.control<number | null>(null),

  parking: this.fb.control<boolean | null>(null),
  garage: this.fb.control<boolean | null>(null),
  jardin: this.fb.control<boolean | null>(null),
  terrasse: this.fb.control<boolean | null>(null),
  cave: this.fb.control<boolean | null>(null),

  surfaceHabitable: this.fb.control<number | null>(null),
  surfaceJardinTerrasse: this.fb.control<number | null>(null),

  disponible: this.fb.control<boolean | null>(null)
});

  ngOnInit() {
    this.propertyId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.bienService.getPropertyById(this.propertyId).subscribe((data) => {
      this.property = data;
      this.adresse = `${data.rue} ${data.numero}, 
      ${data.code_postal} ${data.commune}`;
      console.log(data);
      this.property = data;
      this.propertyForm.patchValue(data);

  this.selectedImage = data.images?.[0];
  })
}
  navBack() {
    window.history.back();
  }

  getImageUrl(imageKey?: string): string {
    if (!imageKey) {
      return './images/properties/penthouse1.jpg';
    }
    return `https://immohorizon-images.s3.us-east-1.amazonaws.com/${imageKey}`;
  }

  onSubmit(){
    const updatedBien = this.propertyForm.getRawValue() ;
      console.log(updatedBien);
     this.bienService.updateBien(this.propertyId,updatedBien,this.newImages.map(img => img.file),this.deletedImages)
  .subscribe({
    next: response => {
      console.log(
        "Bien updated successfully",
        response
      );
    },


    error: err => {
      console.error(
        "Update failed",
        err
      );
    }

  });

  }

  //images 



newImages: NewImage[] = [];


onImagesSelected(event: Event) {

  const input = event.target as HTMLInputElement;

  if (!input.files) return;


  Array.from(input.files).forEach(file => {

    this.newImages.push({
      file: file,
      preview: URL.createObjectURL(file)
    });

  });

}


removeNewImage(index: number) {

  URL.revokeObjectURL(
    this.newImages[index].preview
  );

  this.newImages.splice(index, 1);

}


removeImage(image: Image) {

  if (image.id) {

    this.deletedImages.push(image.id);

  }

  this.property.images =
    this.property?.images?.filter(
      img => img.id !== image.id
    );

}

setPrimaryImage(selected: Image) {

  this.property?.images?.forEach((img)=> {
    img.primary = false;
  })

  selected.primary = true;

}


saveImages() {

  const formData = new FormData();


  // Existing images metadata
  formData.append(
    'images',
    JSON.stringify(this.property.images)
  );


  // New uploads
  this.newImages.forEach(img => {

    formData.append(
      'files',
      img.file
    );

  });



}
}
