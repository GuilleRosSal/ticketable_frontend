import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, exhaustMap, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { UserRole } from '../../../../core/auth/models/user.model';
import { selectUser } from '../../../../core/auth/store/selectors/auth.selector';
import { showToast } from '../../../../core/toasts/store/actions/toast.actions';
import { Pagination, TicketFilters, TicketFiltersAndPagination } from '../../models/ticket.model';
import { TicketService } from '../../services/ticket.service';
import {
  filterTickets,
  initTicketList,
  loadTickets,
  loadTicketsError,
  loadTicketsSuccess,
  openTicket,
  openTicketError,
  openTicketSuccess,
  paginationTickets,
} from '../actions/ticket.actions';
import { selectFilters } from '../selectors/ticket.selector';

@Injectable()
export class TicketEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);
  private ticketService = inject(TicketService);
  private router = inject(Router);

  centraliseTicketLoading$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initTicketList, filterTickets, paginationTickets),
      withLatestFrom(this.store.select(selectFilters), this.store.select(selectUser)),
      switchMap(([action, storedFilters, currentUser]) => {
        let filters: TicketFilters;
        let pagination: Pagination;

        if (action.type === '[Tickets] Init Ticket List') {
          filters = {};
          pagination = { page: 1, limit: action.limit };
        } else if (action.type === '[Tickets] Filter') {
          filters = action.filters;
          pagination = { page: 1, limit: action.limit };
        } else {
          filters = storedFilters;
          pagination = action.pagination;
        }

        // Ensure that if the user is a CLIENT they can only see their own tickets
        if (currentUser?.role === UserRole.CLIENT) {
          filters = {
            ...filters,
            email: currentUser.email,
          };
        }

        return of(loadTickets({ filters, pagination }));
      }),
    ),
  );

  loadTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTickets),
      switchMap(({ filters, pagination }) => {
        const filtersAndPagination: TicketFiltersAndPagination = {
          filters: filters,
          pagination: pagination,
        };

        return this.ticketService.getFilteredTickets(filtersAndPagination).pipe(
          map((filteredTicketsResponse) => loadTicketsSuccess({ filteredTicketsResponse })),
          catchError((error) => of(loadTicketsError({ error }))),
        );
      }),
    ),
  );

  openTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openTicket),
      exhaustMap(({ ticket }) =>
        this.ticketService.openTicket(ticket).pipe(
          map((createdTicket) => openTicketSuccess({ createdTicket })),
          catchError((error) => of(openTicketError({ error }))),
        ),
      ),
    ),
  );

  openTicketSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(openTicketSuccess),
      tap(() => {
        this.router.navigateByUrl('/ticket');
      }),
      map(({ createdTicket }) =>
        showToast({
          message: `Se ha abierto la incidencia "${createdTicket.ticket.subject}"`,
          toastType: 'success',
        }),
      ),
    ),
  );

  ticketError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTicketsError, openTicketError),
      map(({ error }) => showToast({ message: error.error.error, toastType: 'error' })),
    ),
  );
}
