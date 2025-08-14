import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../shared/entities';
import { AuthService } from '../../shared/services/auth-service';
import { Router } from '@angular/router';
import { RoutePaths } from '../../shared/routes';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  imports: [CommonModule, AsyncPipe, MatButtonModule],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.css'
})
export class Toolbar {

  user$!: Observable<User | null>;

  constructor(private auth: AuthService, private router: Router) {
    this.user$ = this.auth.user$;
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate([RoutePaths.LOGIN]);
  }
}
