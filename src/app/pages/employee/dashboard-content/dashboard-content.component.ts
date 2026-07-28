import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { BienService } from '../../../services/biens/bien.service';
import { Bien } from '../../../models/bien.model';
import { LoginService } from '../../../services/auth/login/login.service';
import {RouterLink} from '@angular/router';
@Component({
  selector: 'app-dashboard-content',
  imports: [MatButtonModule,
MatIconModule,
MatCardModule,
MatTableModule,
MatMenuModule,
MatDividerModule,
MatTooltipModule,
RouterLink,
TranslateModule],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css'
})
export class DashboardContentComponent {
  properties!:any[];
  service=inject(BienService);
  loginService= inject(LoginService);
  amount!:number;
  username=this.loginService.getUsername();
  greeting!:string;

  ngOnInit(){
    this.service.getAllProperties().subscribe({
      next:((data)=>{
        this.properties=data;
        console.log(this.properties.length)
        this.amount=this.properties.length
      }),
      error:((err)=>{
        console.log(err);
      })
    })
    this.greeting=this.getGreeting();
}

getGreeting(): string {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'Good_morning';
  } else if (hour < 18) {
    return 'Good_afternoon';
  } else {
    return 'Good_evening';
  }
}

  

    cards = [
    {
      title: 'Properties',
      value: this.amount,
      icon: 'home',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Contracts',
      value: 38,
      icon: 'description',
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Visits',
      value: 21,
      icon: 'event',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Revenue',
      value: '€356K',
      icon: 'payments',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

}
