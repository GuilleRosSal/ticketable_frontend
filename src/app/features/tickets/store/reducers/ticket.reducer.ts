import { Action, createReducer, on } from '@ngrx/store';
import { AppError } from '../../../../core/models/error.model';
import {
  FilteredTicket,
  Pagination,
  PaginatorData,
  TicketFilters,
} from '../../models/ticket.model';
import {
  loadTickets,
  loadTicketsError,
  loadTicketsSuccess,
  openTicket,
  openTicketError,
  openTicketSuccess,
} from '../actions/ticket.actions';

export interface TicketState {
  tickets: FilteredTicket[];
  filters: TicketFilters;
  pagination: Pagination;
  paginatorMetadata: PaginatorData | null;
  loading: boolean;
  error: AppError | null;
}

export const initialState: TicketState = {
  tickets: [],
  filters: {},
  pagination: { page: 1, limit: 8 },
  paginatorMetadata: null,
  loading: false,
  error: null,
};

const _ticketReducer = createReducer(
  initialState,
  on(loadTickets, (state, { filters, pagination }) => ({
    ...state,
    filters: filters,
    pagination: pagination,
    loading: true,
    error: null,
  })),
  on(loadTicketsSuccess, (state, { filteredTicketsResponse }) => ({
    ...state,
    tickets: filteredTicketsResponse.tickets,
    paginatorMetadata: filteredTicketsResponse.paginator_data,
    loading: false,
    error: null,
  })),
  on(loadTicketsError, openTicketError, (state, { error }) => ({
    ...state,
    loading: false,
    error: {
      code: error.status,
      message: error.error.error,
      url: error.url,
    },
  })),
  on(openTicket, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(openTicketSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
);

export function ticketReducer(state: TicketState | undefined, action: Action) {
  return _ticketReducer(state, action);
}
