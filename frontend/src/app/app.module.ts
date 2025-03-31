import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router'; // Make sure this is imported

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql/graphql.module';

// Import components
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employees/employee-add/employee-add.component';
import { EmployeeDetailsComponent } from './components/employees/employee-details/employee-details.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';

// Import services
import { AuthService } from './services/auth.service';
import { EmployeeService } from './services/employee.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeDetailsComponent,
    EmployeeEditComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // This should import RouterModule
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    GraphQLModule,
    RouterModule.forRoot([]) // You can add this explicitly to be sure
  ],
  providers: [
    AuthService,
    EmployeeService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }