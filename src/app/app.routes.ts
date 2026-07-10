import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/employee/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { PropertiesComponent } from './pages/properties/properties/properties.component';
import { CreerBienComponent } from './pages/employee/creer-bien/creer-bien.component';
import { HasRoleGuard } from './guard/role/role.guard';
import { AuthGuard} from './guard/auth/auth.guard';
import { GererBienComponent } from './pages/employee/gerer-bien/gerer-bien.component';
import { PropertyDetailsComponent } from './pages/property/property-details/property-details.component';
import { DashboardContentComponent } from './pages/employee/dashboard-content/dashboard-content.component';
import { ModifierBienComponent } from './pages/employee/modifier-bien/modifier-bien.component';
export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
        data: { breadcrumb: 'Home' },
    },{
        path:'home',
        component: HomeComponent,
        data: { breadcrumb: 'Home' },
        children:[]
    },
    {
        path:'property/:id',
        component: PropertyDetailsComponent,
        data: { breadcrumb: 'Property details' },
    },
    {
        path:'properties',
        component: PropertiesComponent,
        canActivate: [AuthGuard],
        data: { breadcrumb: 'Properties' }
    },
    {
        path:'employee/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE'] },
        children: [
      {
        path: 'properties',
        component: GererBienComponent,
        data: { breadcrumb: 'Properties' }
      },{
        path:'creer-bien',
        component: CreerBienComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE'] }
    },{
        path:'modifier-bien/:id',
        component: ModifierBienComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE'] }
    },{
        path:'property/:id',
        component: PropertyDetailsComponent,
        data: { breadcrumb: 'Property details' },
    },{
        path:'content',
        component: DashboardContentComponent,
        data: { breadcrumb: 'Dashboard content' }
    }
    ]
    },
    {
        path:'employee/creation-bien',
        component: CreerBienComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE'] }
    },
    
    {
        path:'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    }
];
