import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ToastState } from '../reducers/toast.reducer';

export const selectToastState = createFeatureSelector<ToastState>('toast');

export const selectShowToast = createSelector(selectToastState, (state) => state.show);

export const selectToastData = createSelector(selectToastState, (state) => state);
