import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class EmployeeListComponent {
  employees = [
    { name: 'John Doe', position: 'Developer', department: 'Engineering' },
    { name: 'Jane Smith', position: 'Designer', department: 'Marketing' },
    { name: 'Alice Brown', position: 'Manager', department: 'Sales' }
  ];
}
