import { Routes } from '@angular/router';
import { LoginComponent } from './pages/authPages/login/login.component';
import { CreateUserComponent } from './pages/authPages/create-user/create-user.component';
import { DashboardComponent } from './pages/insidepages/dashboard/dashboard.component';
import { StoksComponent } from './pages/insidepages/stoks/stoks.component';
import { AuthGuard, AuthGuardChield, isMatch } from './guards/common/auth.guard';
import { LayoutComponent } from './pages/insidepages/layout/layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';


export const routes: Routes = [
  { path:"",redirectTo:"/login",pathMatch:"full"},
  { path:"login",pathMatch:"full",component:LoginComponent,canMatch:[isMatch]},
  { path:"create",pathMatch:"full",component:CreateUserComponent,canMatch:[isMatch]},
  {
    path:"admin",
    component:LayoutComponent,
    children:[
      {path:"",redirectTo:"dashboard",pathMatch:"full"}, 
      {path:"dashboard",loadComponent:()=>import('./pages/insidepages/dashboard/dashboard.component').then(m=>m.DashboardComponent)}, 
      {path:"stok",loadComponent:()=>import('./pages/insidepages/stoks/stoks.component').then(m=>m.StoksComponent)},
      {path:"employees",loadComponent:()=>import('./pages/insidepages/employees/employees.component').then(m=>m.EmployeesComponent)},
      {path:"employees",loadComponent:()=>import('./pages/insidepages/checkmarks/checkmarks.component').then(m=>m.CheckmarksComponent)},
    ],canActivate:[AuthGuard],canActivateChild:[AuthGuardChield]
  },
  { path:"**",component:NotfoundComponent}


  
  ];