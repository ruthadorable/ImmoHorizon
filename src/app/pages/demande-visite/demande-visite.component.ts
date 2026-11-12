import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';
import { Bien } from '../../models/bien.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BienService } from '../../services/biens/bien.service';
import { VisitFormDialogComponent } from '../../dialog/visit-form-dialog/visit-form-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

interface CreneauVisite {
  id: number;
  date: Date;
  heure: string;
  indisponible: boolean;
}


@Component({
  selector: 'app-demande-visite',
  imports: [CommonModule,MatFormFieldModule,MatDialogModule, MatInputModule, MatIconModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './demande-visite.component.html',
  styleUrl: './demande-visite.component.css'
})
export class DemandeVisiteComponent {
bien: Bien | null = null;
garantieLocative: number | null = null;
minDate = new Date();
loading=false;
successMessage: any;
errorMessage: any;
route: ActivatedRoute = inject(ActivatedRoute);
router = inject(Router);
bienService = inject(BienService);
private fb = inject(FormBuilder);
idBien!: number;


  // INITIALISATION DU FORMULAIRE
  demandeForm = this.fb.group({

    nom: ['', Validators.required],

    prenom: ['', Validators.required],

    email: ['', [
      Validators.required,
      Validators.email
    ]],

    telephone: ['', Validators.required],

    dateSouhaitee: ['', Validators.required],

    heureSouhaitee: ['', Validators.required],

    message: ['']

  });
  
  demandeVisiteService: any;

  constructor(
  private dialog: MatDialog
) {}
  ngOnInit(): void {

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );
    console.log('ID du bien:', id);

    if (!Number.isInteger(id) || id <= 0) {
      this.router.navigate(['/property']);
      return;
    }

    this.idBien = id;

  this.bienService.getPropertyById(id).subscribe({
    next: (data) => {
      this.bien = data;
      this.garantieLocative = data.prix ? data.prix * 2 : null;
    },
    error: () => {
      this.errorMessage = 'Impossible de charger le bien immobilier.';
    }
  });
  }

  onSubmit(): void {

    if (this.demandeForm.invalid) {
      this.demandeForm.markAllAsTouched();
      return;
    }

    console.log(this.demandeForm.value);

  }

  getImageUrl(url?: string): string {
     if (!url) {
    return './images/properties/penthouse1.jpg';
  }
  return url;
  }


get montantEntree(): number {
  return Number(this.bien?.prix || 0)
    // + Number(this.bien?.charges || 0)
    + Number(this.bien?.prix|| 0)*2;
}



// Adresse complète
get adresseComplete(): string {
  if (!this.bien) return '';

  return `${this.bien.rue ?? ''}, ${this.bien.numero ?? ''} - ${this.bien.code_postal ?? ''} ${this.bien.commune ?? ''}`;
}

// Vérifier si le bien est disponible à la location
get estLocation(): boolean {
  return (this.bien?.type ?? '').toLowerCase().includes('louer')
    || (this.bien?.type ?? '').toLowerCase().includes('location');
}

// Prix affiché
get prixAffiche(): string {
  const prix = this.bien?.prix ?? 0;

  return new Intl.NumberFormat('fr-BE', {
    maximumFractionDigits: 0
  }).format(prix);
}

creneauxVisite: CreneauVisite[] = [
  {
    id: 1,
    date: new Date(2026, 10, 14),
    heure: '10:00 - 10:30',
    indisponible: false
  },
  {
    id: 2,
    date: new Date(2026, 10, 17),
    heure: '14:00 - 14:30',
    indisponible: false
  },
  {
    id: 3,
    date: new Date(2026, 10, 19),
    heure: '16:00 - 16:30',
    indisponible: false
  }
];

creneauSelectionne: CreneauVisite | null = null;

selectionnerCreneau(slot: CreneauVisite): void {
  if (slot.indisponible) return;

  this.creneauSelectionne = slot;
}

planifierVisite(): void {

  if (!this.bien?.idBien || !this.creneauSelectionne) {
    return;
  }

  this.dialog.open(VisitFormDialogComponent, {
  width: '720px',
  maxWidth: '95vw',
  maxHeight: '95vh',
  autoFocus: false,
  disableClose: true,
  data: {
    idBien: this.bien.idBien,
    dateVisite: this.creneauSelectionne.date,
    heureVisite: this.creneauSelectionne.heure
  }
});



//   dialogRef.afterClosed().subscribe(formData:any => {

//     if (!formData) return;

//     this.demandeVisiteService.creerDemande(formData)
//       .subscribe({
//         next: () => {
//           this.creneauSelectionne = null;
//           console.log('Demande de visite envoyée.');
//         },
//         error: (error: any) => {
//           console.error('Erreur lors de l’envoi', error);
//         }
//       });

//   });
// }

}
}
