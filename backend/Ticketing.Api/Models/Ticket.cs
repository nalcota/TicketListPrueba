namespace Ticketing.Api.Models
{
    public class Ticket
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string Prioridad { get; set; } = "Baja"; // Baja, Media, Alta
        public string Estado { get; set; } = "Nuevo";   // Nuevo, En Progreso, Resuelto
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
        public string UsuarioAsignado { get; set; } = string.Empty;
    }
}
