import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export interface Ticket {
  id?: number;
  titulo: string;
  descripcion: string;
  prioridad: 'Baja' | 'Media' | 'Alta';
  estado: 'Nuevo' | 'En Progreso' | 'Resuelto';
  fechaCreacion?: string;
  usuarioAsignado?: string;
}

@Injectable({ providedIn: 'root' })
export class TicketService {
  private baseUrl = 'http://localhost:5243/api/tickets';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: token ? `Bearer ${token}` : ''
    });
  }

  getTickets(estado?: string, prioridad?: string): Observable<Ticket[]> {
    let url = `${this.baseUrl}?`;
    if (estado) url += `estado=${estado}&`;
    if (prioridad) url += `prioridad=${prioridad}&`;
    return this.http.get<Ticket[]>(url, { headers: this.getAuthHeaders() });
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.baseUrl, ticket, { headers: this.getAuthHeaders() });
  }

  updateTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.put<Ticket>(`${this.baseUrl}/${ticket.id}`, ticket, { headers: this.getAuthHeaders() });
  }

  deleteTicket(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.getAuthHeaders() });
  }
}
