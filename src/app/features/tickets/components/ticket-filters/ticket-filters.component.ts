import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-ticket-filters',
  imports: [],
  templateUrl: './ticket-filters.component.html',
  styleUrl: './ticket-filters.component.scss',
})
export class TicketFiltersComponent {
  @Output() onClose = new EventEmitter<void>();

  hideFilters() {
    this.onClose.emit();
  }
}
