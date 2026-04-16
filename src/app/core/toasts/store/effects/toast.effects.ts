import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, of, switchMap } from 'rxjs';
import { hideToast, showToast } from '../actions/toast.actions';

@Injectable()
export class ToastEffects {
  private actions$ = inject(Actions);

  autoHideToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showToast),
      switchMap(({ toastType }) => {
        const duration = toastType === 'error' ? 8000 : 4000;
        return of(hideToast()).pipe(delay(duration));
      }),
    ),
  );
}
