import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../../../../core/auth/store/actions/auth.actions';
import { selectUser } from '../../../../core/auth/store/selectors/auth.selector';

@Component({
  selector: 'app-profile-menu',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './profile-menu.component.html',
  styleUrl: './profile-menu.component.scss',
})
export class ProfileMenuComponent {
  private store = inject(Store);
  private router = inject(Router);

  user$ = this.store.select(selectUser);

  logout() {
    this.store.dispatch(logout());
  }

  isActiveLink(route: string): boolean {
    return this.router.url.endsWith(route);
  }
}
