import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./core/auth/auth.routes').then((m) => m.authRoutes) },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () => import('./features/profile/profile.routes').then((m) => m.profileRoutes),
  },
  {
    path: 'ticket',
    canActivate: [authGuard],
    loadChildren: () => import('./features/tickets/ticket.routes').then((m) => m.ticketRoutes),
  },
  { path: '', redirectTo: 'ticket', pathMatch: 'full' },
  { path: '**', redirectTo: 'ticket' },
];
