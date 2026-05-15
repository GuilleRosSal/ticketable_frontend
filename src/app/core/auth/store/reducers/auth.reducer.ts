import { Action, createReducer, on } from '@ngrx/store';
import { environment } from '../../../../../environments/environment';
import { AppError } from '../../../models/error.model';
import { User } from '../../models/user.model';
import {
  login,
  loginError,
  loginSuccess,
  logout,
  register,
  registerError,
  registerSuccess,
  updatePassword,
  updatePasswordError,
  updatePasswordSuccess,
  updateProfileData,
  updateProfileDataError,
  updateProfileDataSuccess,
} from '../actions/auth.actions';

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: AppError | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, register, updateProfileData, updatePassword, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, registerSuccess, updateProfileDataSuccess, (state, { authUser }) => ({
    ...state,
    user: authUser.user,
    token: authUser.token,
    loading: false,
    error: null,
  })),
  on(
    loginError,
    registerError,
    updateProfileDataError,
    updatePasswordError,
    (state, { error }) => ({
      ...state,
      loading: false,
      error: {
        code: error.status,
        message: error.error.error || environment.defaultErrorMsg,
        url: error.url,
      },
    }),
  ),
  on(logout, () => initialState),
  on(updatePasswordSuccess, (state, { response }) => ({
    ...state,
    loading: false,
    error: null,
  })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
