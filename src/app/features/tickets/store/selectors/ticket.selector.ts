import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState } from '../reducers/ticket.reducer';

export const selectTicketFeature = createFeatureSelector<TicketState>('ticket');

export const selectTickets = createSelector(selectTicketFeature, (state) => state.tickets);

export const selectFilters = createSelector(selectTicketFeature, (state) => state.filters);

export const selectPagination = createSelector(selectTicketFeature, (state) => state.pagination);

export const selectPaginatorMetadata = createSelector(
  selectTicketFeature,
  (state) => state.paginatorMetadata,
);
