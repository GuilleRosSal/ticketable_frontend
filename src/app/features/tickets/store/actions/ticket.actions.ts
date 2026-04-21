import { createAction, props } from '@ngrx/store';
import {
  FilteredTicketsResponse,
  Pagination,
  TicketCreationData,
  TicketCreationResponse,
  TicketFilters,
} from '../../models/ticket.model';

export const initTicketList = createAction(
  '[Tickets] Init Ticket List',
  props<{ limit: number }>(),
);

export const filterTickets = createAction(
  '[Tickets] Filter',
  props<{ filters: TicketFilters; limit: number }>(),
);

export const paginationTickets = createAction(
  '[Tickets] Paginate',
  props<{ pagination: Pagination }>(),
);

export const loadTickets = createAction(
  '[Tickets] Load Tickets',
  props<{ filters: TicketFilters; pagination: Pagination }>(),
);

export const loadTicketsSuccess = createAction(
  '[Tickets] Load Tickets Success',
  props<{ filteredTicketsResponse: FilteredTicketsResponse }>(),
);

export const loadTicketsError = createAction(
  '[Tickets] Load Tickets Error',
  props<{ error: any }>(),
);

export const openTicket = createAction(
  '[Tickets] Open Ticket',
  props<{ ticket: TicketCreationData }>(),
);

export const openTicketSuccess = createAction(
  '[Tickets] Open Ticket Success',
  props<{ createdTicket: TicketCreationResponse }>(),
);

export const openTicketError = createAction('[Tickets] Open Ticket Error', props<{ error: any }>());
