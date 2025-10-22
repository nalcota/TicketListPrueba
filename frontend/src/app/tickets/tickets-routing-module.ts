import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./ticket-list/ticket-list.component').then(m => m.TicketListComponent)
  },
  {
    path: 'form',
    loadComponent: () =>
      import('./ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
  },
  {
    path: 'form/:id',
    loadComponent: () =>
      import('./ticket-form/ticket-form.component').then(m => m.TicketFormComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule {}
