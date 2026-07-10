import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-dashboard-content',
  imports: [MatButtonModule,
MatIconModule,
MatCardModule,
MatTableModule,
MatMenuModule,
MatDividerModule,
MatTooltipModule],
  templateUrl: './dashboard-content.component.html',
  styleUrl: './dashboard-content.component.css'
})
export class DashboardContentComponent {
    cards = [
    {
      title: 'Properties',
      value: 142,
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
