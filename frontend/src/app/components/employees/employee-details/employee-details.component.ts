import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | null = null;
  loading = false;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.employeeService.getEmployee(id)
        .subscribe(
          data => {
            this.employee = data;
            this.loading = false;
          },
          error => {
            this.error = 'Error loading employee details. Please try again.';
            this.loading = false;
          }
        );
    } else {
      this.error = 'Employee ID not provided.';
      this.loading = false;
    }
  }

  deleteEmployee(): void {
    if (!this.employee || !this.employee.id) return;
    
    if (confirm('Are you sure you want to delete this employee?')) {
      this.loading = true;
      this.employeeService.deleteEmployee(this.employee.id)
        .subscribe(
          () => {
            this.router.navigate(['/employees']);
          },
          error => {
            this.error = 'Error deleting employee. Please try again.';
            this.loading = false;
          }
        );
    }
  }
}