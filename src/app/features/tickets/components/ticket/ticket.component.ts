import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilteredTicket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  imports: [DatePipe],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  @Input({ required: true }) ticket!: FilteredTicket;
}
