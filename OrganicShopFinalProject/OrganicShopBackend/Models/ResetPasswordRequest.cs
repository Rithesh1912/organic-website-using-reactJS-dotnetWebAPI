using System.ComponentModel.DataAnnotations;

namespace OrganicShopBackend.Models
{
    public class ResetPasswordRequest
    {
        public string Token { get; set; } = string.Empty; // Ensure it is not null
        public string NewPassword { get; set; } = string.Empty;
    }

}