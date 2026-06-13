import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/employee/dashboard/dashboard.component';
export const routes: Routes = [
    {
        path:'',
        redirectTo:'home',
        pathMatch:'full',
    },{
        path:'home',
        component: HomeComponent,
    },{
        path:'login',
        component: LoginComponent
    },
    {
        path:'employee/dashboard',
        component: DashboardComponent
    }
];
