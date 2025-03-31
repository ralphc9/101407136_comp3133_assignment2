import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  loading = false;
  error = '';
  searchDepartment = '';
  searchPosition = '';

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees()
      .subscribe(
        data => {
          this.employees = data;
          this.loading = false;
        },
        error => {
          this.error = 'Error loading employees. Please try again.';
          this.loading = false;
        }
      );
  }

  searchEmployees(): void {
    this.loading = true;
    this.employeeService.searchEmployees(this.searchDepartment, this.searchPosition)
      .subscribe(
        data => {
          this.employees = data;
          this.loading = false;
        },
        error => {
          this.error = 'Error searching employees. Please try again.';
          this.loading = false;
        }
      );
  }

  resetSearch(): void {
    this.searchDepartment = '';
    this.searchPosition = '';
    this.loadEmployees();
  }

  deleteEmployee(id: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.loading = true;
      this.employeeService.deleteEmployee(id)
        .subscribe(
          () => {
            this.employees = this.employees.filter(emp => emp.id !== id);
            this.loading = false;
          },
          error => {
            this.error = 'Error deleting employee. Please try again.';
            this.loading = false;
          }
        );
    }
  }

  logout(): void {
    this.authService.logout();
  }
}