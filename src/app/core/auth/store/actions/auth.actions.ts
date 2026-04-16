import { createAction, props } from '@ngrx/store';
import { AuthUser, LoginCredentials, RegisterData } from '../../models/auth.model';
import { ProfileData, UpdatePassword, UpdatePasswordResponse } from '../../models/user.model';

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

export const updateProfileData = createAction(
  '[Auth] Update Profile Data',
  props<{ user_id: number; profileData: ProfileData }>(),
);

export const updateProfileDataSuccess = createAction(
  '[Auth] Update Profile Data Success',
  props<{ authUser: AuthUser }>(),
);

export const updateProfileDataError = createAction(
  '[Auth] Update Profile Data Error',
  props<{ error: any }>(),
);

export const updatePassword = createAction(
  '[Auth] Update Password',
  props<{ user_id: number; passwordData: UpdatePassword }>(),
);

export const updatePasswordSuccess = createAction(
  '[Auth] Update Password Success',
  props<{ response: UpdatePasswordResponse }>(),
);

export const updatePasswordError = createAction(
  '[Auth] Update Password Error',
  props<{ error: any }>(),
);
