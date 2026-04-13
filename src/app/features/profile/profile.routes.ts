import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/profile-container/profile-container.component').then(
        (m) => m.ProfileContainerComponent,
      ),
    children: [
      {
        path: 'menu',
        loadComponent: () =>
          import('./components/profile-menu/profile-menu.component').then(
            (m) => m.ProfileMenuComponent,
          ),
      },
      {
        path: 'main',
        loadComponent: () =>
          import('./components/profile-main-data/profile-main-data.component').then(
            (m) => m.ProfileMainDataComponent,
          ),
      },
      {
        path: 'password',
        loadComponent: () =>
          import('./components/profile-password-change/profile-password-change.component').then(
            (m) => m.ProfilePasswordChangeComponent,
          ),
      },
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: '**', redirectTo: 'main' },
    ],
  },
  { path: '**', redirectTo: '' },
];
