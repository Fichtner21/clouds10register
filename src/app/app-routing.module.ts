import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [  
  {
    path: 'home', 
    component: HomeComponent, 
  },
  {
    path: 'register',
    component: RegisterComponent,
  },  
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
