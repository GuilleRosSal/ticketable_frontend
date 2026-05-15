import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  FilteredTicketsResponse,
  TicketCreationData,
  TicketCreationResponse,
  TicketDetailsResponse,
  TicketFiltersAndPagination,
  TicketResolutionData,
  TicketResolutionResponse,
  TicketStatesResponse,
} from '../models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private http = inject(HttpClient);
  private baseURL = `${environment.backendUrl}/ticket`;

  getStates(): Observable<TicketStatesResponse> {
    return this.http.get<TicketStatesResponse>(`${this.baseURL}/states`);
  }

  getTicketDetails(id: number): Observable<TicketDetailsResponse> {
    return this.http.get<TicketDetailsResponse>(`${this.baseURL}/${id}`);
  }

  getFilteredTickets(
    filtersAndPagination: TicketFiltersAndPagination,
  ): Observable<FilteredTicketsResponse> {
    let params = new HttpParams();

    if (filtersAndPagination.pagination) {
      params = params.set('page', filtersAndPagination.pagination.page.toString());
      params = params.set('limit', filtersAndPagination.pagination.limit.toString());
    }

    if (filtersAndPagination.filters) {
      for (const [key, filter] of Object.entries(filtersAndPagination.filters)) {
        // Make sure the state (enum TicketState) is read as a String
        const value = String(filter || '').trim();
        if (value) {
          params = params.set(key, value);
        }
      }
    }

    return this.http.get<FilteredTicketsResponse>(this.baseURL, { params });
  }

  openTicket(data: TicketCreationData): Observable<TicketCreationResponse> {
    const formData = new FormData();

    formData.append('subject', data.subject);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('subcategory', data.subcategory);

    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return this.http.post<TicketCreationResponse>(this.baseURL, formData);
  }

  resolveTicket(id: number, data: TicketResolutionData): Observable<TicketResolutionResponse> {
    const formData = new FormData();

    formData.append('state', String(data.state));

    if (data.resolution) {
      formData.append('resolution', data.resolution);
    }

    if (data.images) {
      data.images.forEach((image) => {
        formData.append('images', image);
      });
    }

    return this.http.put<TicketResolutionResponse>(`${this.baseURL}/${id}`, formData);
  }
}
