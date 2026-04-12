import { createAction, props } from '@ngrx/store';
import { AuthUser, LoginCredentials, RegisterData } from '../../models/auth.model';

export const login = createAction('[Auth] Login', props<{ credentials: LoginCredentials }>());

export const loginSuccess = createAction('[Auth] Login Success', props<{ authUser: AuthUser }>());

export const loginError = createAction('[Auth] Login Error', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');

export const register = createAction('[Auth] Register', props<{ registerData: RegisterData }>());

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ authUser: AuthUser }>(),
);

export const registerError = createAction('[Auth] Register Error', props<{ error: any }>());
