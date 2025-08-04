import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { RoutePaths } from '../../shared/routes';

@Component({
  selector: 'app-not-found-component',
  imports: [RouterModule],
  templateUrl: './not-found-component.html',
  styleUrl: './not-found-component.css'
})
export class NotFoundComponent {

  constructor(private router: Router) {}
  
  redirectHome() {
    this.router.navigate([RoutePaths.HOME]
    );
  }
}
