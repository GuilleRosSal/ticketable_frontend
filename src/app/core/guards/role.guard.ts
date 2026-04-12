import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectUserRole } from '../auth/store/selectors/auth.selector';

export const roleGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles'];

  return store.select(selectUserRole).pipe(
    take(1),
    map((userRole) => {
      if (userRole && expectedRoles.includes(userRole)) {
        return true;
      }

      return router.createUrlTree(['/ticket']);
    }),
  );
};
