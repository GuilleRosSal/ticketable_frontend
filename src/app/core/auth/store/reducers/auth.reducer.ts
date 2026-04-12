import { Action, createReducer, on } from '@ngrx/store';
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
  on(login, (state, { credentials }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loginSuccess, (state, { authUser }) => ({
    ...state,
    user: authUser.user,
    token: authUser.token,
    loading: false,
    error: null,
  })),
  on(loginError, (state, { error }) => ({
    ...state,
    loading: false,
    error: {
      code: error.status,
      message: error.error?.message || error.message,
      url: error.url,
    },
  })),
  on(logout, () => initialState),
  on(register, (state, { registerData }) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(registerSuccess, (state, { authUser }) => ({
    ...state,
    user: authUser.user,
    token: authUser.token,
    loading: false,
    error: null,
  })),
  on(registerError, (state, { error }) => ({
    ...state,
    loading: false,
    error: {
      code: error.status,
      message: error.error?.message || error.message,
      url: error.url,
    },
  })),
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}
