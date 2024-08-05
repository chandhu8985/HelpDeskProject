import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewrequestComponent } from './newrequest/newrequest.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { FaqsComponent } from './faqs/faqs.component';
import { DashboardComponent } from './dashboard/dashboard.component';




const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home/:id', component: HomeComponent ,children:[
    {path:'',component:DashboardComponent},
    {path:'dashboard',component:DashboardComponent},
    { path: 'newrequest', component: NewrequestComponent },
    { path: 'newrequest/:id', component: NewrequestComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'faqs', component: FaqsComponent },
    { path: 'about', component: AboutComponent },
  ]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
