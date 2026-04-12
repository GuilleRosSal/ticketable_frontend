import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selecAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectAuthToken = createSelector(selecAuthFeature, (state) => state.token);

export const selectUser = createSelector(selecAuthFeature, (state) => state.user);

export const selectUserRole = createSelector(selecAuthFeature, (state) => state.user?.role);
