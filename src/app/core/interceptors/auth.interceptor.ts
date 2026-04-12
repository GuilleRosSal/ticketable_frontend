import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { selectAuthToken } from '../auth/store/selectors/auth.selector';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  const NO_AUTH_ROUTES = ['/auth/login', '/auth/register'];

  const isPublicRoute = NO_AUTH_ROUTES.some((url) => req.url.includes(url));

  if (isPublicRoute) {
    return next(req);
  }

  let token: string | null = null;

  store
    .select(selectAuthToken)
    .pipe(take(1))
    .subscribe((t) => (token = t));

  if (token) {
    const requestWithAuth = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(requestWithAuth);
  }

  return next(req);
};
