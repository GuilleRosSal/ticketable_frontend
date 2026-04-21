import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './core/auth/store/reducers/auth.reducer';
import { toastReducer, ToastState } from './core/toasts/store/reducers/toast.reducer';
import { ticketReducer, TicketState } from './features/tickets/store/reducers/ticket.reducer';

export interface AppState {
  auth: AuthState;
  toast: ToastState;
  ticket: TicketState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  toast: toastReducer,
  ticket: ticketReducer,
};
