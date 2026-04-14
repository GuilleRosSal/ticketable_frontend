import { User } from '../../../core/auth/models/user.model';
import { Category } from './category.model';

export enum TicketState {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}
export interface Ticket {
  ticket_id: number;
  subject: string;
  description: string;
  creation_date: string;
  resolution_date?: string | null;
  state: TicketState;
  resolution?: string | null;

  // IDs of other entities
  category_id?: number;
  user_id?: number;
}

export interface TicketDetails extends Ticket {
  // Properties of other entities
  category: Category;
  User: Partial<User>;
  clientimage: string[];
  resolutionimage: string[];
}

export interface FilteredTicket {
  ticket_id: number;
  subject: string;
  state: TicketState;
  creation_date: string;

  category: Category;
  User: Partial<User>;
}

export interface TicketCreationData {
  subject: string;
  description: string;
  category: string;
  subcategory: string;
  images?: File[];
}

export interface TicketResolutionData {
  state: TicketState.IN_PROGRESS | TicketState.RESOLVED;
  resolution?: string;
  images?: File[];
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
  category?: string;
  subcategory?: string;
  email?: string;
  state?: TicketState;
  creation_date?: string;
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
  ticket: TicketDetails;
}

// GET /ticket
export interface FilteredTicketsResponse {
  tickets: FilteredTicket[];
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

export interface TicketStatesResponse {
  states: string[];
}
