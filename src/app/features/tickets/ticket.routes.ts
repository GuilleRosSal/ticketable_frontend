import { Routes } from '@angular/router';
import { roleGuard } from '../../core/guards/role.guard';

export const ticketRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/ticket-container/ticket-container.component').then(
        (m) => m.TicketContainerComponent,
      ),
  },
  {
    path: 'create',
    canActivate: [roleGuard],
    data: { roles: ['CLIENT'] },
    loadComponent: () =>
      import('./components/ticket-creation/ticket-creation.component').then(
        (m) => m.TicketCreationComponent,
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import('./components/ticket-details/ticket-details.component').then(
        (m) => m.TicketDetailsComponent,
      ),
  },
  { path: '**', redirectTo: '' },
];
