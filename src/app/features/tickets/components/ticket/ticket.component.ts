import { DatePipe, NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FilteredTicket } from '../../models/ticket.model';

@Component({
  selector: 'app-ticket',
  imports: [DatePipe, RouterLink, NgClass],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent {
  @Input({ required: true }) ticket!: FilteredTicket;
}
