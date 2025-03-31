import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  template: '<div style="padding: 20px; background-color: lightblue;"><h2>Login Component Works!</h2></div>'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { 
    // Redirect if already logged in
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees']);
    }
  }

  ngOnInit(): void {
    // Simple console log to verify component initialization
    console.log('Login component initialized');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // Convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
  this.authService.login(
    this.loginForm.get('username')?.value, 
    this.loginForm.get('password')?.value
  )
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/employees']);
      },
      error => {
        this.error = error.message || 'Invalid username or password';
        this.loading = false;
      }
    );
  }
}