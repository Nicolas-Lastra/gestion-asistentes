import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../shared/services/auth-service';
import { Router } from '@angular/router';
import { RoutePaths } from '../../../shared/routes';
import { Credentials } from '../../../shared/entities';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login implements OnInit {

  loginForm!: FormGroup;
  loginError = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const creds: Credentials = this.loginForm.value as Credentials;
      console.table(creds)
      this.authService.login(creds).subscribe(ok => {
        if (ok) {
          this.router.navigate([RoutePaths.HOME]);
        } else {
          this.loginError = true;
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

}
