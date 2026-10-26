// import { Component,inject} from '@angular/core';
// import { BienService } from '../../../services/biens/bien.service';
// import { Bien } from '../../../models/bien.model';
// import { ActivatedRoute, Router, RouterOutlet, RouterStateSnapshot, RouterLink } from '@angular/router';
// import { TranslateModule, TranslateService } from '@ngx-translate/core';
// import { MatIconModule } from '@angular/material/icon';
// import { Image } from '../../../models/image.model';
// import { MatButtonModule } from '@angular/material/button';
// import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';


// @Component({
//   selector: 'app-property-details',
//   imports: [CommonModule, TranslateModule, MatIconModule, MatButtonModule, MatIconModule, DatePipe, BreadcrumbComponent],
//   templateUrl: './property-details.component.html',
//   styleUrl: './property-details.component.css'
// })
// export class PropertyDetailsComponent {

//   public property!:Bien;
//   public selectedImage!: Image;
//   public adresse!:string;
//   private bienService=inject(BienService);
//   private route=inject(ActivatedRoute);
//   private router=inject(Router);
//   private propertyId!:number;
//   private translateService=inject(TranslateService);
  


//   ngOnInit(){
//     this.propertyId = Number(
//       this.route.snapshot.paramMap.get('id')
//     );

//      this.bienService.getPropertyById(this.propertyId).subscribe( (data)=>{
//       this.property=data;
//       this.adresse = `${data.rue} ${data.numero}, 
//       ${data.code_postal} ${data.commune}`;
//       console.log(data);
//       if (this.property?.images?.length) {
//       const primary = this.property.images.find(i => i.primary);
//       this.selectedImage = primary ?? this.property.images[0];
//   }
//   })
//   }
//   navBack(){
//     window.history.back();
//   }

//   getImageUrl(url?: string): string {
//      if (!url) {
//     return './images/properties/penthouse1.jpg';
//   }
//   return url;
//   }
  

//   selectImage(image: Image) {
//   this.selectedImage = image;
// }

// nextImage() {

//   if (!this.property?.images?.length) return;

//   const index = this.property.images.findIndex(
//     i => i.id === this.selectedImage.id
//   );

//   const next = (index + 1) % this.property.images.length;

//   this.selectedImage = this.property.images[next];
// }

// previousImage() {

//   if (!this.property?.images?.length) return;

//   const index = this.property.images.findIndex(
//     i => i.id === this.selectedImage.id
//   );

//   const previous =
//     (index - 1 + this.property.images.length) %
//     this.property.images.length;

//   this.selectedImage = this.property.images[previous];
// }

//  isRecent(){
//   if (!this.property?.disponibilite) {
//     return false;
//   }

//   const disponibilite = new Date(this.property.disponibilite);
//   const threeMonthAgo = new Date();

//   threeMonthAgo.setMonth(threeMonthAgo.getMonth() - 3);

//   return disponibilite >= threeMonthAgo
// }

// navToContact(){
//   this.router.navigate(['/contact']);
// }
 
// }
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { BienService } from '../../../services/biens/bien.service.js';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-property-details',
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    TranslateModule],
  template: './property-details.component.html',
})
export class PropertyDetailsComponent {
  /** Alimenté par :id grâce à withComponentInputBinding() */
  readonly id = input.required<number>();
  private readonly properties = inject(BienService);

  private readonly result = toSignal(
    toObservable(this.id).pipe(
      switchMap((id) =>
        this.properties.getPropertyById(id).pipe(
          map((property) => ({ loading: false, property })),
          catchError(() => of({ loading: false, property: null })),
          startWith({ loading: true, property: null }),
        ),
      ),
    ),
    { initialValue: { loading: true, property: null } },
  );

  readonly state = computed(() => this.result());
}
