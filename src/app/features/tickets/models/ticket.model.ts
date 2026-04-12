import { User } from '../../../core/auth/models/user.model';
import { Category } from './category.model';
import { Image } from './image.model';

export interface Ticket {
  ticket_id: number;
  subject: string;
  description?: string;
  creation_date?: string;
  resolution_date?: string | null;
  state: TicketState;
  resolution?: string | null;

  // IDs of other entities
  category_id?: number;
  user_id?: number;

  // Properties of other entities
  category?: Category;
  User?: Partial<User>;
  clientimage?: Image[];
  resolutionimage?: Image[];
}

export enum TicketState {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

/*-----------------------------------------------------*\
            Ticket Pagination and Filtering
\*-----------------------------------------------------*/
export interface PaginatorData {
  current_page: number;
  last_page: number;
  items_per_page: number;
  total_items: number;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface TicketFilters {
  category: string;
  subcategory: string;
  email: string;
  state: TicketState;
  creation_date: string;
}

export interface TicketFiltersAndPagination {
  filters?: TicketFilters;
  pagination?: Pagination;
}

/*-----------------------------------------------------*\
                    Response wrappers
\*-----------------------------------------------------*/
// GET /ticket/:id
export interface TicketDetailsResponse {
  ticket: Ticket;
}

// GET /ticket
export interface FilteredTicketsResponse {
  tickets: Ticket[];
  paginator_data: PaginatorData | null;
}

// POST /ticket
export interface TicketCreationResponse {
  ticket: Ticket;
  imageURLs: string[];
}

// PUT /ticket/:id
export interface TicketResolutionResponse {
  ticket: Ticket;
  imageURLs: string[];
}
