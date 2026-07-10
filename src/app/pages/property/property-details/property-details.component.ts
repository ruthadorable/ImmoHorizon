import { Component,inject} from '@angular/core';
import { BienService } from '../../../services/biens/bien.service';
import { Bien } from '../../../models/bien.model';
import { ActivatedRoute, Router, RouterOutlet, RouterStateSnapshot } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { Image } from '../../../models/image.model';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-property-details',
  imports: [CommonModule,TranslateModule,MatIconModule,MatButtonModule,MatIconModule,DatePipe,BreadcrumbComponent],
  templateUrl: './property-details.component.html',
  styleUrl: './property-details.component.css'
})
export class PropertyDetailsComponent {

  public property!:Bien;
  public selectedImage!: Image;
  public adresse!:string;
  private bienService=inject(BienService);
  private route=inject(ActivatedRoute);
  private propertyId!:number;
  private translateService=inject(TranslateService);
  


  ngOnInit(){

    
    this.propertyId = Number(
      this.route.snapshot.paramMap.get('id')
    );

     this.bienService.getPropertyById(this.propertyId).subscribe( (data)=>{
      this.property=data;
      this.adresse = `${data.rue} ${data.numero}, 
      ${data.code_postal} ${data.commune}`;
      console.log(data);
      if (this.property?.images?.length) {
      const primary = this.property.images.find(i => i.primary);
      this.selectedImage = primary ?? this.property.images[0];
  }
  })
  }
  navBack(){
    window.history.back();
  }

  getImageUrl(url: string): string {
     if (!url) {
    return './images/properties/penthouse1.jpg';
  }
  return url;
  }

  selectImage(image: Image) {
  this.selectedImage = image;
}

nextImage() {

  if (!this.property?.images?.length) return;

  const index = this.property.images.findIndex(
    i => i.id === this.selectedImage.id
  );

  const next = (index + 1) % this.property.images.length;

  this.selectedImage = this.property.images[next];
}

previousImage() {

  if (!this.property?.images?.length) return;

  const index = this.property.images.findIndex(
    i => i.id === this.selectedImage.id
  );

  const previous =
    (index - 1 + this.property.images.length) %
    this.property.images.length;

  this.selectedImage = this.property.images[previous];
}

 isRecent(){
  if (!this.property?.disponibilite) {
    return false;
  }

  const disponibilite = new Date(this.property.disponibilite);
  const oneMonthAgo = new Date();

  oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

  return disponibilite >= oneMonthAgo
}
 
}
