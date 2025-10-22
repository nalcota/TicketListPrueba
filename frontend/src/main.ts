import 'zone.js';

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter([
      {
        path: 'login',
        loadChildren: () => import('./app/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./app/tickets/tickets.module').then(m => m.TicketsModule)
      },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login' }
    ])
  ]
});