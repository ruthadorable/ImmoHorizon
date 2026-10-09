import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {

  contactForm: FormGroup;
  submitted = false;
  messageSent = false;

  constructor(private fb: FormBuilder) {

    this.contactForm = this.fb.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],

      email: ['', [
        Validators.required,
        Validators.email
      ]],

      phone: [''],

      subject: ['', [
        Validators.required
      ]],

      message: ['', [
        Validators.required,
        Validators.minLength(10)
      ]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    console.log('Contact form:', this.contactForm.value);

    // TODO:
    // Replace this with your backend API call.
    //
    // Example:
    // this.contactService.sendMessage(this.contactForm.value)
    //   .subscribe({
    //      next: () => {
    //        this.messageSent = true;
    //        this.contactForm.reset();
    //        this.submitted = false;
    //      }
    //   });

    this.messageSent = true;

    this.contactForm.reset();
    this.submitted = false;
  }

  getError(controlName: string): string {

    const control = this.contactForm.get(controlName);

    if (!control || !control.errors || !control.touched) {
      return '';
    }

    if (control.errors['required']) {
      return 'This field is required.';
    }

    if (control.errors['email']) {
      return 'Please enter a valid email address.';
    }

    if (control.errors['minlength']) {
      return `Minimum ${control.errors['minlength'].requiredLength} characters required.`;
    }

    return '';
  }
}