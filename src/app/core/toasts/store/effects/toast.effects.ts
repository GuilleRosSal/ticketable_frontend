import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { delay, map } from 'rxjs';
import { hideToast, showToast } from '../actions/toast.actions';

@Injectable()
export class ToastEffects {
  private actions$ = inject(Actions);

  autoHideToast$ = createEffect(() =>
    this.actions$.pipe(
      ofType(showToast),
      delay(4000),
      map(() => hideToast()),
    ),
  );
}
