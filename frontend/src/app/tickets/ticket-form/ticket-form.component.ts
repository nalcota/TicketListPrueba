import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Ticket, TicketService } from '../ticket.service';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule]
})
export class TicketFormComponent implements OnInit {
  ticketForm: FormGroup;
  ticketId?: number;

  constructor(
    private fb: FormBuilder,
    private ticketService: TicketService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.ticketForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      prioridad: ['Baja', Validators.required],
      estado: ['Nuevo', Validators.required],
      usuarioAsignado: ['']
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.ticketId = +params['id'];
        this.ticketService.getTickets().subscribe({
          next: tickets => {
            const ticket = tickets.find(t => t.id === this.ticketId);
            if (ticket) this.ticketForm.patchValue(ticket);
          },
          error: err => {
            console.error(err);
            window.alert('Error al cargar el ticket ❌');
          }
        });
      }
    });
  }

  submit(): void {
    if (this.ticketForm.invalid) return;

    const ticket: Ticket = this.ticketForm.value;

    if (this.ticketId) {
      ticket.id = this.ticketId;
      this.ticketService.updateTicket(ticket).subscribe({
        next: () => {
          window.alert('Ticket actualizado correctamente ✅');
          this.router.navigate(['/tickets']);
        },
        error: err => {
          console.error(err);
          window.alert('Error al actualizar el ticket ❌');
        }
      });
    } else {
      this.ticketService.createTicket(ticket).subscribe({
        next: () => {
          window.alert('Ticket creado correctamente ✅');
          this.router.navigate(['/tickets']);
        },
        error: err => {
          console.error(err);
          window.alert('Error al crear el ticket ❌');
        }
      });
    }
  }
}
