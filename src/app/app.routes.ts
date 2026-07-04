import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/employee/dashboard/dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { PropertiesComponent } from './pages/properties/properties/properties.component';
import { CreerBienComponent } from './pages/employee/creer-bien/creer-bien.component';
import { HasRoleGuard } from './guard/role/role.guard';
import { AuthGuard} from './guard/auth/auth.guard';
export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
    },{
        path:'home',
        component: HomeComponent,
    },
    {
        path:'properties',
        component: PropertiesComponent,
        canActivate: [AuthGuard],
    },
    {
        path:'employee/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYEE'] }
    },
    {
        path:'employee/dashboard/creation-bien',
        component: CreerBienComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYEE'] }
    },
    {
        path:'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    }
];
