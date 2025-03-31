import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
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
    this.employeeService.addEmployee(this.employeeForm.value)
      .subscribe(
        data => {
          this.router.navigate(['/employees']);
        },
        error => {
          this.error = error.message || 'Error adding employee. Please try again.';
          this.loading = false;
        }
      );
  }
}