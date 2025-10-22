using System.ComponentModel.DataAnnotations;

namespace Ticketing.Api.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Username { get; set; } = null!;

        [Required]
        public string Password { get; set; } = null!;
    }
}
