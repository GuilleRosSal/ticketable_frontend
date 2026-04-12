import { Injectable } from '@angular/core';
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
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

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
          //navigate to loginForm
          //this.router.navigateByUrl('/home');
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
          //navegación a home
          //this.router.navigateByUrl('/home');
        }),
      ),
    { dispatch: false },
  );

  authError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginError, registerError),
      map(({ error }) => showToast({ message: error.message, toastType: 'error' })),
    ),
  );
}
