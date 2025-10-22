import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const appRoutes: Routes = [
    // Redirige la raíz al login correctamente
    { path: '', redirectTo: 'auth', pathMatch: 'full' }
    ,
    // Módulo de autenticación (lazy load)
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth.module').then(m => m.AuthModule)
    },

    // Módulo de tickets (lazy load)
    {
        path: 'tickets',
        loadChildren: () =>
            import('./tickets/tickets.module').then(m => m.TicketsModule)
    },

    // Fallback para cualquier ruta desconocida
    { path: '**', redirectTo: 'auth/login' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
