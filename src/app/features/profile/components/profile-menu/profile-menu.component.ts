import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-profile-menu',
  imports: [RouterLink],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent {
  private store = inject(Store);
  private router = inject(Router);

  logout() {}

  isActiveLink(route: string): boolean {
    return this.router.url.endsWith(route);
  }
}
