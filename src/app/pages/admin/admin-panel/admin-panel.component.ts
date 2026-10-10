import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { SidenavComponent } from '../../employee/shared/sidenav/sidenav.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AdminSidenavComponent } from '../admin-sidenav/admin-sidenav.component';

@Component({
  selector: 'app-admin-panel',
  imports: [MatCardModule, MatIcon, MatButtonModule, MatToolbarModule, RouterOutlet,
    MatSidenavModule, MatListModule, MatMenuModule, MatBadgeModule, AdminSidenavComponent],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
badgevisible = false;
isMobile = false;

constructor(
  private breakpointObserver: BreakpointObserver
) {
  this.breakpointObserver
    .observe([Breakpoints.Handset])
    .subscribe(result => {
      this.isMobile = result.matches;
    });
}
  badgevisibility() {
    this.badgevisible = true;
  }
   public getUsername(): string {
    const username = localStorage.getItem('username')+" "+localStorage.getItem('prenom')  ;
    return username ? username : '';
  }
  
}
