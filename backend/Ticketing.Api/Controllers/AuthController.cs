using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ticketing.Api.Data;
using Ticketing.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace Ticketing.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private const string SecretKey = "MiClaveSuperSecreta12345678901234!"; // >=32 chars
        private readonly byte[] _keyBytes = Encoding.UTF8.GetBytes(SecretKey);
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Usuario user)
        {
            // Busca el usuario en la base de datos
            var existingUser = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Username == user.Username && u.Password == user.Password);

            if (existingUser == null)
                return Unauthorized(new { message = "Usuario o contraseña incorrecta" });

            // Crear token JWT
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.Name, existingUser.Username)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(_keyBytes),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { Token = tokenHandler.WriteToken(token) });
        }
    }
}

