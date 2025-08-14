import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth-service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [NgbNavModule, RouterModule, AsyncPipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  active = 'homeSection';
  isAdmin$!: Observable<boolean>;
  
  constructor(private auth: AuthService) {
    this.isAdmin$ = this.auth.isAdmin$;
  }
}
