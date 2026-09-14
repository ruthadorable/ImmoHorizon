import { Component,inject } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Input } from '@angular/core';
import { Bien } from '../../../models/bien.model';
import { Router } from '@angular/router';
import {CommonModule, CurrencyPipe}  from '@angular/common';




@Component({
  selector: 'app-property-card',
  imports: [CommonModule,MatCardModule,MatButton, MatButtonModule,MatIcon],
  templateUrl: './property-card.component.html',
  styleUrl: './property-card.component.css'
})
export class PropertyCardComponent {

  @Input()
  property! : Bien;

  router=inject(Router);

  getImageUrl(url?: string): string {
     if (!url) {
    return './images/properties/penthouse1.jpg';
  }
  return url;
  }

navigateToProperty(id: number) {
  console.log("Property id :"+id)
  this.router.navigate(['/property',id]);
}
isRecent(){
  if (!this.property?.disponibilite) {
    return false;
  }

  const disponibilite = new Date(this.property.disponibilite);
  const threeMonthAgo = new Date();

  threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);

  return disponibilite >= threeMonthAgo
}
 ;
}
