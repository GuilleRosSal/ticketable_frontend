import { createAction, props } from '@ngrx/store';
import { ToastType } from '../../models/toast.model';

export const showToast = createAction(
  '[Toast] Show toast',
  props<{ message: string; toastType: ToastType }>(),
);

export const hideToast = createAction('[Toast] Hide toast');
