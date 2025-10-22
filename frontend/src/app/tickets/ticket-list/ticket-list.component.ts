import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { Ticket, TicketService } from '../ticket.service';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    RouterModule
  ],
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.css']
})
export class TicketListComponent implements OnInit {
  displayedColumns: string[] = [
    'titulo', 'descripcion', 'prioridad', 'estado',
    'usuarioAsignado', 'fechaCreacion', 'acciones'
  ];

  tickets: Ticket[] = [];
  estadoFilter: string = '';
  prioridadFilter: string = '';

  constructor(private ticketService: TicketService, private router: Router) {}

  ngOnInit() {
    this.loadTickets();
  }

  loadTickets() {
    this.ticketService.getTickets(this.estadoFilter, this.prioridadFilter)
      .subscribe({
        next: data => this.tickets = data,
        error: err => console.error('Error cargando tickets', err)
      });
  }

  editTicket(ticket: Ticket) {
    this.router.navigate(['/tickets/form', ticket.id]);
  }

  deleteTicket(id: number) {
    if (!confirm('¿Seguro que quieres eliminar este ticket?')) return;
    this.ticketService.deleteTicket(id).subscribe({
      next: () => this.loadTickets(),
      error: err => console.error('Error eliminando ticket', err)
    });
  }

  goToNewTicket() {
    this.router.navigate(['/tickets/form']);
  }
}
