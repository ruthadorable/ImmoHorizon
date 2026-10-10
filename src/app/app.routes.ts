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
import { GererBlogComponent } from './pages/blog/gerer-blog/gerer-blog.component';
import { CreerBlogComponent } from './pages/blog/creer-blog/creer-blog.component';
import { ModifierBlogComponent } from './pages/blog/modifier-blog/modifier-blog.component';
import { ArticleDetailsComponent } from './pages/blog/article-details/article-details.component';
import { PublierAnnonceComponent } from './components/publier-annonce/publier-annonce.component';
import { NewpropertiesComponent } from './pages/properties/newproperties/newproperties.component';
import { DevisComponent } from './pages/devis/devis.component';
import { PublicationPaymentComponent } from './pages/publication-payment/publication-payment.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { AdminContentComponent } from './pages/admin/admin-content/admin-content.component';
import { ManageUsersComponent } from './pages/admin/manage-users/manage-users.component';
import { CreateUserComponent } from './pages/admin/create-user/create-user.component';
import { UpdateUserComponent } from './pages/admin/update-user/update-user.component';
import { ViewUserComponent } from './pages/admin/view-user/view-user.component';
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
        path:'new',
        component: NewpropertiesComponent,
        data: { breadcrumb: 'NEW' },
        children:[]
    },
       {
        path:'publierannonce',
        component: PublierAnnonceComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['CLIENT'] }
    },
       {
        path:'contact',
        component: ContactusComponent,
        data: { breadcrumb: 'Contact' },
        children:[]
    },
     {
        path:'publication-payment/:id',
        component: PublicationPaymentComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['CLIENT'] }
    },
      {
        path:'devis',
        component: DevisComponent,
        data: { breadcrumb: 'Devis' },
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
        path:'employee',
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
        path:'dashboard',
        component: DashboardContentComponent
    },
    {
        path: 'gerer-blog',
        component: GererBlogComponent
      }
    
    ]},
    {
        path:'admin',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] },
        children: [
      {
        path: 'properties',
        component: GererBienComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }},
        {
        path:'properties/creer-bien',
        component: CreerBienComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },{
        path:'properties/modifier-bien/:id',
        component: ModifierBienComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },{
        path:'properties/property/:id',
        component: PropertyDetailsComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },{
        path:'dashboard',
        component: AdminContentComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },
    {
        path: 'blog',
        component: GererBlogComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
     },{
        path:'blog/creer-blog',
        component: CreerBlogComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE','ADMIN'] }
    },{
        path:'blog/modifier-blog/:id',
        component: ModifierBlogComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE','ADMIN'] }
    },{
        path:'blog/blog/:id',
        component: ArticleDetailsComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['EMPLOYE','ADMIN'] }
    },
    {
        path: 'users',
        component: ManageUsersComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },
      {
        path: 'users/create',
        component: CreateUserComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },
     {
        path: 'users/update/:id',
        component: UpdateUserComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },  
    {
        path: 'users/user/:id',
        component: ViewUserComponent,
        canActivate: [AuthGuard, HasRoleGuard],
        data: { roles: ['ADMIN'] }
    },  
]
}

]
