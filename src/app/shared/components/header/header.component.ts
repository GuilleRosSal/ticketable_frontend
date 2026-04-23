import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUserRole } from '../../../core/auth/store/selectors/auth.selector';

@Component({
  selector: 'app-header',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private store = inject(Store);

  userRole$ = this.store.select(selectUserRole);

  getProfileLink(): string {
    const isMobile = window.innerWidth < 768;
    return isMobile ? '/profile/menu' : '/profile/main';
  }
}
