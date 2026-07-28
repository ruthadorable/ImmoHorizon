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
import { AvendreComponent } from './pages/properties/avendre/avendre.component';
import { AlouerComponent } from './pages/properties/alouer/alouer.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { BlogComponent } from './pages/blog/blog.component';
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
        path:'avendre',
        component: AvendreComponent,
        data: { breadcrumb: 'A VENDRE' },
        children:[]
    },
    {
        path:'alouer',
        component: AlouerComponent,
        data: { breadcrumb: 'A LOUER' },
        children:[]
    },
    {
        path:'properties',
        component: PropertiesComponent,
        data: { breadcrumb: 'Properties' }
    },
    {   path:'about',
        component: AboutusComponent,
        data: { breadcrumb: 'About us' }

    },
    {   path:'blog',
        component: BlogComponent,
        data: { breadcrumb: 'Blog' }

    },
    {
        path:'employee/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE'] },
        children: [
      {
        path: 'properties',
        component: GererBienComponent
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
        component: PropertyDetailsComponent
    },{
        path:'content',
        component: DashboardContentComponent
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
