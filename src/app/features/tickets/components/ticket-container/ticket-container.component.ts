import { Component } from '@angular/core';
import { TicketFiltersComponent } from '../ticket-filters/ticket-filters.component';
import { TicketListComponent } from '../ticket-list/ticket-list.component';
import { TicketPaginationComponent } from '../ticket-pagination/ticket-pagination.component';

@Component({
  selector: 'app-ticket-container',
  imports: [TicketFiltersComponent, TicketListComponent, TicketPaginationComponent],
  templateUrl: './ticket-container.component.html',
  styleUrl: './ticket-container.component.scss',
})
export class TicketContainerComponent {
  showFilters: boolean = false;
}
