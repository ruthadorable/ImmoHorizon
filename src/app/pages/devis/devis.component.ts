import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-devis',
  imports: [CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatCheckboxModule],
  templateUrl: './devis.component.html',
  styleUrl: './devis.component.css'
})
export class DevisComponent {

  devisForm: FormGroup;

  projectType = 'VENTE';

  constructor(private fb: FormBuilder) {

    this.devisForm = this.fb.group({

      firstName: [
        '',
        Validators.required
      ],

      lastName: [
        '',
        Validators.required
      ],

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      phone: [
        ''
      ],

      propertyType: [
        '',
        Validators.required
      ],

      location: [
        '',
        Validators.required
      ],

      budget: [
        ''
      ],

      surface: [
        ''
      ],

      message: [
        '',
        [
          Validators.required,
          Validators.minLength(10)
        ]
      ],

      contactPreference: [
        'EMAIL',
        Validators.required
      ],

      privacy: [
        false,
        Validators.requiredTrue
      ]

    });

  }

  selectProjectType(type: string): void {

    this.projectType = type;

  }

  submitForm(): void {

    if (this.devisForm.invalid) {

      this.devisForm.markAllAsTouched();

      return;
    }

    const request = {
      ...this.devisForm.value,
      projectType: this.projectType
    };

    console.log('Demande de devis:', request);

    // TODO:
    // this.devisService.createRequest(request).subscribe(...)

  }


}
