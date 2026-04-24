import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { obtainTicketsPerPage } from '../../../../shared/utils/window.utils';
import { Pagination } from '../../models/ticket.model';
import { paginationTickets } from '../../store/actions/ticket.actions';
import { selectPaginatorMetadata } from '../../store/selectors/ticket.selector';

@Component({
  selector: 'app-ticket-pagination',
  imports: [],
  templateUrl: './ticket-pagination.component.html',
  styleUrl: './ticket-pagination.component.scss',
})
export class TicketPaginationComponent implements OnInit {
  private store = inject(Store);
  private destroyRef = inject(DestroyRef);

  currentPage: number = 1;
  totalPages: number = 1;
  visiblePages: number[] = [];

  ngOnInit(): void {
    this.store
      .select(selectPaginatorMetadata)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((paginatorMetadata) => {
        if (paginatorMetadata) {
          this.currentPage = paginatorMetadata.current_page;
          this.totalPages = paginatorMetadata.last_page;
          this.generatePagination();
        }
      });
  }

  generatePagination() {
    if (this.totalPages <= 1) {
      this.visiblePages = [];
      return;
    }

    let start: number;

    if (this.currentPage === 1) {
      start = 1;
    } else if (this.currentPage === this.totalPages) {
      start = Math.max(1, this.totalPages - 2);
    } else {
      start = this.currentPage - 1;
    }

    const end = Math.min(this.totalPages, start + 2);

    if (end - start < 2 && start > 1) {
      start = Math.max(1, end - 2);
    }

    this.visiblePages = [];
    for (let i = start; i <= end; i++) {
      this.visiblePages.push(i);
    }
  }

  goToPage(page: number) {
    const limit = obtainTicketsPerPage();

    const pagination: Pagination = {
      page,
      limit,
    };

    this.store.dispatch(paginationTickets({ pagination }));
  }
}
