import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs';
import { selectAuthToken } from '../auth/store/selectors/auth.selector';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);

  return store.select(selectAuthToken).pipe(
    take(1),
    map((token) => {
      if (token) {
        return true;
      }

      return router.createUrlTree(['/auth/login']);
    }),
  );
};
