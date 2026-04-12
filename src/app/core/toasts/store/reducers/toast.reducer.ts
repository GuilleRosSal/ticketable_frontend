import { Action, createReducer, on } from '@ngrx/store';
import { ToastType } from '../../models/toast.model';
import { hideToast, showToast } from '../actions/toast.actions';

export interface ToastState {
  message: string;
  toastType: ToastType;
  show: boolean;
}

export const initialState: ToastState = {
  message: '',
  toastType: 'success',
  show: false,
};

const _toastReducer = createReducer(
  initialState,
  on(showToast, (state, { message, toastType }) => ({
    ...state,
    message,
    toastType,
    show: true,
  })),
  on(hideToast, (state) => ({
    ...state,
    show: false,
  })),
);

export function toastReducer(state: ToastState | undefined, action: Action) {
  return _toastReducer(state, action);
}
