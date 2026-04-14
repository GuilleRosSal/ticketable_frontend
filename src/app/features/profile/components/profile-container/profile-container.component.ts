import { Component, HostListener, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({
  selector: 'app-profile-container',
  imports: [ProfileMenuComponent, RouterOutlet],
  templateUrl: './profile-container.component.html',
  styleUrl: './profile-container.component.scss',
})
export class ProfileContainerComponent {
  private router = inject(Router);

  constructor() {
    this.checkRouteConsistency();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkRouteConsistency();
  }

  private checkRouteConsistency() {
    const isDesktop = window.innerWidth >= 768;
    const isMenu = this.router.url.endsWith('/menu');

    if (isDesktop && isMenu) {
      this.router.navigate(['/profile/main'], { replaceUrl: true });
    }
  }

  isMenuRoute(): boolean {
    return this.router.url.endsWith('/menu');
  }
}
