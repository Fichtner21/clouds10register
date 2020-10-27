import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CompletedComponent } from './completed/completed.component';


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
    path: 'completed', 
    component: CompletedComponent, 
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
