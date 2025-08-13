import { Component } from '@angular/core';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from "./navbar/navbar";
import { Router, RouterModule } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule, AsyncPipe } from '@angular/common';
import { AuthService } from '../shared/services/auth-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, AsyncPipe, Toolbar, Navbar, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'gestion-asistentes';
  activeSection = "studentsSection";
  isLoggedIn$: Observable<boolean>;

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private router: Router, private auth: AuthService) {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
  }
}