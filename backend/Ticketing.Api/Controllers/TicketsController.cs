using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Ticketing.Api.Data;
using Ticketing.Api.Models;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TicketsController : ControllerBase
{
    private readonly AppDbContext _context;

    public TicketsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetTickets([FromQuery] string? estado, [FromQuery] string? prioridad)
    {
        var query = _context.Tickets.AsQueryable();

        if (!string.IsNullOrEmpty(estado))
            query = query.Where(t => t.Estado == estado);

        if (!string.IsNullOrEmpty(prioridad))
            query = query.Where(t => t.Prioridad == prioridad);

        return Ok(await query.ToListAsync());
    }

    [HttpPost]
    public async Task<IActionResult> CreateTicket([FromBody] Ticket ticket)
    {
        ticket.FechaCreacion = DateTime.UtcNow;
        ticket.Estado = "Nuevo";
        _context.Tickets.Add(ticket);
        await _context.SaveChangesAsync();
        return Ok(ticket);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTicket(int id, [FromBody] Ticket ticket)
    {
        var existing = await _context.Tickets.FindAsync(id);
        if (existing == null) return NotFound();

        existing.Titulo = ticket.Titulo;
        existing.Descripcion = ticket.Descripcion;
        existing.Prioridad = ticket.Prioridad;
        existing.Estado = ticket.Estado;
        existing.UsuarioAsignado = ticket.UsuarioAsignado;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTicket(int id)
    {
        var ticket = await _context.Tickets.FindAsync(id);
        if (ticket == null) return NotFound();

        _context.Tickets.Remove(ticket);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
