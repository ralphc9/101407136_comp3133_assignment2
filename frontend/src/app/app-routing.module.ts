import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employees/employee-add/employee-add.component';
import { EmployeeDetailsComponent } from './components/employees/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { AuthGuard } from './guards/auth.guard';


// Create a simple test component for debugging
import { Component } from '@angular/core';

@Component({
  selector: 'app-debug',
  template: '<div style="padding: 20px; background-color: lightgreen;"><h2>Debug Route Works!</h2></div>'
})
export class DebugComponent {}

const routes: Routes = [
  { path: '', redirectTo: '/debug', pathMatch: 'full' },
  {path: 'debug', component: DebugComponent},
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { 
    path: 'employees', 
    component: EmployeeListComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employees/add', 
    component: EmployeeAddComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employees/:id', 
    component: EmployeeDetailsComponent, 
    canActivate: [AuthGuard] 
  },
  { 
    path: 'employees/:id/edit', 
    component: EmployeeEditComponent, 
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/login' },

  {path: '**', redirectTo: '/debug'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true})],
  exports: [RouterModule],
  declarations: [DebugComponent]
})
export class AppRoutingModule { }