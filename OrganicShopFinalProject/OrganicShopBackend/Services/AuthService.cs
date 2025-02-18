using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using OrganicShopBackend.Data;
using OrganicShopBackend.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace OrganicShopBackend.Services
{
    public class AuthService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;
        private readonly EmailService _emailService;
        private readonly ILogger<AuthService> _logger;

        public AuthService(ApplicationDbContext context, IConfiguration config, EmailService emailService, ILogger<AuthService> logger)
        {
            _context = context;
            _config = config;
            _emailService = emailService;
            _logger = logger;
        }

        // Authenticate user with email and password
        public async Task<string> AuthenticateUser(string email, string password)
        {
            var user = await _context.Users
                .Where(u => u.Email.ToLower() == email.ToLower())
                .FirstOrDefaultAsync();

            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                _logger.LogWarning("Authentication failed for email: {Email}", email);
                return null;
            }

            return GenerateJwtToken(user);
        }

        // Generate JWT Token for the user
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim("userId", user.UserId.ToString()),
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        // Register a new user
        public async Task<bool> RegisterUser(SignupRequest model)
        {
            var existingUser = await _context.Users
                .Where(u => u.Email.ToLower() == model.Email.ToLower())
                .FirstOrDefaultAsync();

            if (existingUser != null)
            {
                _logger.LogWarning("Registration failed: Email already exists {Email}", model.Email);
                return false;
            }

            var newUser = new User
            {
                Name = model.Name,
                Email = model.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password),
                Role = "User"
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            _logger.LogInformation("New user registered: {Email}", model.Email);
            return true;
        }

        // Generate password reset token and send reset email
        public async Task<string> GeneratePasswordResetToken(string email)
        {
            _logger.LogInformation("Password reset requested for email: {Email}", email);

            var user = await _context.Users
                .Where(u => u.Email.ToLower() == email.ToLower())
                .FirstOrDefaultAsync();

            if (user == null)
            {
                _logger.LogWarning("Password reset failed: User not found for email: {Email}", email);
                return null;
            }

            var resetToken = GenerateJwtToken(user);

            try
            {
                await _emailService.SendPasswordResetEmail(user.Email, resetToken, user.Name);
                _logger.LogInformation("Password reset email sent successfully to: {Email}", user.Email);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error sending password reset email: {Error}", ex.Message);
                return null;
            }

            return resetToken;
        }

        // Reset password using the token and new password
        public async Task<bool> ResetPassword(string token, string newPassword)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            try
            {
                var claims = tokenHandler.ReadJwtToken(token).Claims;
                var userIdClaim = claims.FirstOrDefault(c => c.Type == "userId")?.Value;

                if (string.IsNullOrEmpty(userIdClaim))
                {
                    _logger.LogWarning("Invalid password reset token");
                    return false;
                }

                int userId = int.Parse(userIdClaim);
                var user = await _context.Users.FindAsync(userId);

                if (user == null)
                {
                    _logger.LogWarning("Password reset failed: User not found for token");
                    return false;
                }

                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(newPassword);
                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                _logger.LogInformation("Password successfully reset for userId: {UserId}", userId);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError("Error resetting password: {Error}", ex.Message);
                return false;
            }
        }

        // Get user by email
        public async Task<User> GetUserByEmail(string email)
        {
            return await _context.Users
                .AsNoTracking()  // Prevents tracking issues
                .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
        }

    }
}