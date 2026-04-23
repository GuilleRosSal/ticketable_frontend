import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, fromEvent, map, startWith } from 'rxjs';
import { selectUserRole } from '../../../../core/auth/store/selectors/auth.selector';
import { initTicketList } from '../../store/actions/ticket.actions';
import { selectTickets } from '../../store/selectors/ticket.selector';
import { TicketComponent } from '../ticket/ticket.component';

@Component({
  selector: 'app-ticket-list',
  imports: [TicketComponent, AsyncPipe, RouterLink],
  templateUrl: './ticket-list.component.html',
  styleUrl: './ticket-list.component.scss',
})
export class TicketListComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  tickets$ = this.store.select(selectTickets);
  userRole$ = this.store.select(selectUserRole);

  ngOnInit(): void {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(300),
        map(() => this.obtainTicketsPerPage()),
        distinctUntilChanged(),
        startWith(this.obtainTicketsPerPage()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((limit) => this.loadTickets(limit));
  }

  loadTickets(limit: number) {
    this.store.dispatch(initTicketList({ limit }));
  }

  obtainTicketsPerPage(): number {
    const vw = window.innerWidth;

    if (vw < 768) return 8;
    if (vw > 1024) return 14;
    return 12;
  }
}
