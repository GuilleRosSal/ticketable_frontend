import { Action, createReducer, on } from '@ngrx/store';
import { AppError } from '../../../../core/models/error.model';
import {
  FilteredTicket,
  Pagination,
  PaginatorData,
  TicketFilters,
} from '../../models/ticket.model';
import {
  filterTickets,
  initTicketList,
  loadTicketsError,
  loadTicketsSuccess,
  openTicket,
  openTicketError,
  openTicketSuccess,
  paginationTickets,
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
  on(initTicketList, (state, { limit }) => ({
    ...state,
    pagination: {
      ...state.pagination,
      limit,
    },
    loading: true,
    error: null,
  })),
  on(filterTickets, (state, { filters, limit }) => ({
    ...state,
    filters: filters,
    pagination: {
      ...state.pagination,
      limit,
    },
    loading: true,
    error: null,
  })),
  on(paginationTickets, (state, { pagination }) => ({
    ...state,
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
