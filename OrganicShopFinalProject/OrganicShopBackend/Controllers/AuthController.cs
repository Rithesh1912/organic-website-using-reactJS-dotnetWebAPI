using Microsoft.AspNetCore.Mvc;
using OrganicShopBackend.Models;
using OrganicShopBackend.Services;
using System.Threading.Tasks;

namespace OrganicShopBackend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly EmailService _emailService;

        public AuthController(AuthService authService, EmailService emailService)
        {
            _authService = authService;
            _emailService = emailService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest model)
        {
            var token = await _authService.AuthenticateUser(model.Email, model.Password);
            if (token == null)
                return Unauthorized(new { Message = "Invalid credentials" });

            var user = await _authService.GetUserByEmail(model.Email);

            return Ok(new
            {
                Token = token,
                UserId = user.UserId,
                Name = user.Name,
                Email = user.Email,
                Role = user.Role
            });
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupRequest model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _authService.RegisterUser(model);
            if (!result)
                return BadRequest(new { Message = "User registration failed: Email might already be in use." });

            return Ok(new { Message = "User registered successfully" });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest model)
        {
            var user = await _authService.GetUserByEmail(model.Email);
            if (user == null)
            {
                return BadRequest(new { message = "Email not found" });
            }

            var token = await _authService.GeneratePasswordResetToken(user.Email);
            if (string.IsNullOrEmpty(token))
            {
                return StatusCode(500, new { message = "Failed to generate reset token" });
            }

            return Ok(new { message = "Password reset email sent" });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest model)
        {
            var result = await _authService.ResetPassword(model.Token, model.NewPassword);
            if (!result)
                return BadRequest(new { Message = "Invalid or expired token" });

            return Ok(new { Message = "Password reset successfully" });
        }
    }
}