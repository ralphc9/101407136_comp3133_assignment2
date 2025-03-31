import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../../models/employee.model';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  employeeId: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: [''],
      salary: ['', [Validators.min(0)]],
      position: [''],
      department: [''],
      profilePicture: ['']
    });

    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id) {
      this.employeeId = id;
      this.employeeService.getEmployee(id)
        .subscribe(
          employee => {
            this.employeeForm.patchValue(employee);
            this.imagePreview = employee.profilePicture || null;
            this.loading = false;
          },
          error => {
            this.error = 'Error loading employee data. Please try again.';
            this.loading = false;
          }
        );
    } else {
      this.error = 'Employee ID not provided.';
      this.loading = false;
    }
  }

  // Convenience getter for easy access to form fields
  get f() { return this.employeeForm.controls; }

  onFileChange(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        this.imagePreview = reader.result;
        this.employeeForm.patchValue({
          profilePicture: reader.result
        });
      };
      
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.employeeForm.invalid) {
      return;
    }

    this.loading = true;
    const updatedEmployee = {
      ...this.employeeForm.value,
      id: this.employeeId
    };

    this.employeeService.updateEmployee(updatedEmployee)
      .subscribe(
        data => {
          this.router.navigate(['/employees', this.employeeId]);
        },
        error => {
          this.error = error.message || 'Error updating employee. Please try again.';
          this.loading = false;
        }
      );
  }
}