import { Component } from '@angular/core';
import { Toolbar } from './toolbar/toolbar';
import { Navbar } from "./navbar/navbar";
import { RouterModule } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  imports: [Toolbar, Navbar, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'gestion-asistentes';
  activeSection = "studentsSection";

  constructor(private http: HttpClient, private _snackBar: MatSnackBar) { }
}
