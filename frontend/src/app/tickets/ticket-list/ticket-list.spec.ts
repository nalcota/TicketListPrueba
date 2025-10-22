import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TicketListComponent } from './ticket-list.component';
import { TicketService, Ticket } from '../ticket.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TicketListComponent', () => {
  let component: TicketListComponent;
  let fixture: ComponentFixture<TicketListComponent>;
  let ticketServiceSpy: jasmine.SpyObj<TicketService>;

  // Datos simulados para los tests
  const mockTickets: Ticket[] = [
    { id: 1, titulo: 'Ticket 1', descripcion: 'Desc 1', prioridad: 'Alta', estado: 'Nuevo' },
    { id: 2, titulo: 'Ticket 2', descripcion: 'Desc 2', prioridad: 'Media', estado: 'En Progreso' }
  ];

  beforeEach(async () => {
    // Creamos un spy del TicketService para simular sus métodos
    const spy = jasmine.createSpyObj('TicketService', ['getTickets', 'deleteTicket']);
    spy.getTickets.and.returnValue(of(mockTickets)); // getTickets devuelve datos simulados
    spy.deleteTicket.and.returnValue(of(void 0)); // deleteTicket no devuelve nada

    // Configuración del TestBed con el componente y módulos necesarios
    await TestBed.configureTestingModule({
      imports: [
        TicketListComponent,       // Componente standalone
        RouterTestingModule,       // Para simular la navegación
        HttpClientTestingModule    // Para simular llamadas HTTP
      ],
      providers: [
        { provide: TicketService, useValue: spy } // Inyectamos el spy en lugar del servicio real
      ]
    }).compileComponents();

    // Obtenemos el spy y creamos el componente
    ticketServiceSpy = TestBed.inject(TicketService) as jasmine.SpyObj<TicketService>;
    fixture = TestBed.createComponent(TicketListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Ejecuta detección de cambios
  });

  // Test 1: Comprobar que el componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Test 2: Comprobar que los tickets se cargan al inicializar el componente
  it('debería cargar los tickets al iniciar', () => {
    expect(ticketServiceSpy.getTickets).toHaveBeenCalled(); // Verifica que se llamó al servicio
    expect(component.tickets.length).toBe(2); // Deben cargarse 2 tickets
    expect(component.tickets[0].titulo).toBe('Ticket 1'); // Verifica el primer ticket
  });

  // Test 3: Comprobar navegación al formulario para crear un ticket nuevo
  it('debería navegar al formulario para crear un ticket nuevo', () => {
    const routerSpy = spyOn(component['router'], 'navigate'); // Espiamos la navegación
    component.goToNewTicket(); // Llamamos al método
    expect(routerSpy).toHaveBeenCalledWith(['/tickets/form']); // Verificamos ruta
  });

  // Test 4: Comprobar que se elimina un ticket y se recargan los tickets
  it('debería llamar a deleteTicket y recargar los tickets', () => {
    spyOn(window, 'confirm').and.returnValue(true); // Simula confirmación del usuario
    component.deleteTicket(1); // Llamamos a eliminar ticket con id 1
    expect(ticketServiceSpy.deleteTicket).toHaveBeenCalledWith(1); // Verifica que se llamó deleteTicket
    expect(ticketServiceSpy.getTickets).toHaveBeenCalledTimes(2); // Se llama al cargar y luego al recargar
  });
});
