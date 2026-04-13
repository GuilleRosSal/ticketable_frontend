import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { showToast } from '../../../toasts/store/actions/toast.actions';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  register,
  registerError,
  registerSuccess,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ credentials }) =>
        this.authService.login(credentials).pipe(
          map((authUser) =>
            loginSuccess({
              authUser,
            }),
          ),
          catchError((error) => of(loginError({ error }))),
        ),
      ),
    ),
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.router.navigateByUrl('/auth/login');
        }),
      ),
    { dispatch: false },
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      exhaustMap(({ registerData }) =>
        this.authService.register(registerData).pipe(
          map((authUser) =>
            registerSuccess({
              authUser,
            }),
          ),
          catchError((error) => of(registerError({ error }))),
        ),
      ),
    ),
  );

  authSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess, registerSuccess),
        tap(() => {
          this.router.navigateByUrl('/ticket');
        }),
      ),
    { dispatch: false },
  );

  authError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginError, registerError),
      map(({ error }) => showToast({ message: error.error.error, toastType: 'error' })),
    ),
  );
}
