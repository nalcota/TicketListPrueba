import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketsRoutingModule } from './tickets-routing-module';

@NgModule({
  imports: [
    CommonModule,
    TicketsRoutingModule // ✅ solo rutas
    // NO importes los componentes standalone aquí
  ]
})
export class TicketsModule { }
