import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducer';

export const selectAuthFeature = createFeatureSelector<AuthState>('auth');

export const selectAuthToken = createSelector(selectAuthFeature, (state) => state.token);

export const selectUser = createSelector(selectAuthFeature, (state) => state.user);

export const selectUserRole = createSelector(selectAuthFeature, (state) => state.user?.role);
